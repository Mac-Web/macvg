DEBUG_ENABLED=false;PLAYTEST_ENABLED=false;var util;
(function (util) {
    var Scale = (function () {
        function Scale() {
        }
        Scale.determineAssetType = function () {
            if (cfg.Settings.forcedAssetType != null && Scale.imageScales[cfg.Settings.forcedAssetType] != undefined) {
                Scale.assetType = cfg.Settings.forcedAssetType;
            }
            else {
                var sizeTest;
                var scaleFactor = window.devicePixelRatio || 1;
                if (Game.orientation == "portrait") {
                    sizeTest = window.innerHeight * scaleFactor;
                }
                else if (Game.orientation == "landscape") {
                    sizeTest = window.innerWidth * scaleFactor;
                }
                if (sizeTest <= 800 && !Game.game.device.desktop) {
                    Scale.assetType = 'small';
                }
                else if (sizeTest > 800 && sizeTest <= 1280 && !Game.game.device.desktop) {
                    Scale.assetType = 'normal';
                }
                else if ((sizeTest > 1280 && sizeTest < 1920) || (sizeTest <= 1280 && Game.game.device.desktop)) {
                    Scale.assetType = 'hd';
                }
                else if (sizeTest > 1920 || Game.game.device.desktop) {
                    Scale.assetType = 'retina';
                }
            }
            Scale.imageScale = Scale.imageScales[Scale.assetType];
        };
        Scale.setup = function () {
            util.Scale.determineAssetType();
            var orientationSettings = cfg.Settings.getOrientationSettings();
            Game.game.scale.setMinMax(orientationSettings.minResolution.width, orientationSettings.minResolution.height);
            Game.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            Game.dimensions = util.Scale.getDimensions();
            Game.game.scale.setGameSize(Game.dimensions.width, Game.dimensions.height);
        };
        Scale.getGameRatio = function () {
            var windowRatio, gameRatio, orientationSettings = cfg.Settings.getOrientationSettings();
            if (Game.orientation == "portrait") {
                windowRatio = window.innerHeight / window.innerWidth;
                gameRatio = Math.max(Math.min(windowRatio, orientationSettings.minRatio), orientationSettings.maxRatio);
            }
            else if (Game.orientation == "landscape") {
                windowRatio = window.innerWidth / window.innerHeight;
                gameRatio = Math.max(Math.min(windowRatio, orientationSettings.minRatio), orientationSettings.maxRatio);
            }
            return gameRatio;
        };
        Scale.getDimensions = function () {
            var dimensions, orientationSettings = cfg.Settings.getOrientationSettings();
            // Horizontal stretching, vertical cropping
            var gameWidth = orientationSettings.workingWidth * Scale.imageScale;
            dimensions = new util.Dimensions(gameWidth, gameWidth * Scale.getGameRatio());
            return dimensions;
        };
        Scale.getCanvasScale = function () {
            return parseInt(Game.game.canvas.style.width, 10) / Game.game.canvas.width;
        };
        Scale.assetType = null;
        Scale.imageScale = null;
        Scale.imageScales = {
            'small': .2,
            'normal': .4,
            'hd': .6,
            'retina': .8
        };
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
/**
 * Game contains the base logic for setting up our game
 */
var Game = (function () {
    function Game() {
    }
    /**
     * Initializes the game
     */
    Game.init = function () {
        Game.orientation = cfg.Settings.forcedOrientation ? cfg.Settings.forcedOrientation : (window.innerWidth > window.innerHeight ? "landscape" : "portrait");
        Game.game = new Phaser.Game(0, 0, Phaser.CANVAS, "phaser-game", {
            preload: Game.preload,
            create: Game.create
        });
        PokiSDK.initWithVideoHB().then(function () {
            // successfully initialized
            console.log("PokiSDK initialized");
            // continue to game
            Game.pokiAdSdkLoaded = true;
        }).catch(function () {
            // initialized but the user has an adblock
            console.log("Adblock enabled");
            // feel free to kindly ask the user to disable AdBlock, like forcing weird usernames or showing a sad face; be creative!
            // continue to the game
        });
        // PokiSDK.setDebug(true);
        // Load states
        for (var stateName in Game._states) {
            Game.game.state.add(stateName, Game._states[stateName]);
        }
    };
    /**
     * Preload things that are needed before the PreloadState
     */
    Game.preload = function () {
        // Preload images here because we need this for the preroll
        Game.game.load.json("images", "assets/data/images.json");
        // Need themeData for Analytics (amongst other things)
        Game.game.load.json("theme", "assets/data/theme.json");
    };
    /**
     * Setup the game before going into preloading
     */
    Game.create = function () {
        Game.themeData = Game.game.cache.getJSON("theme");
        // Prevent right-mouse click
        Game.game.canvas.oncontextmenu = function (e) { e.preventDefault(); };
        // Set up scaling
        util.Scale.setup();
        // Advanced timing required for things like FPS debugging
        Game.game.time.advancedTiming = true;
        // Disable visibility change checks, also explicitly remove events or flurry will cause errors. Pretty hacky..
        Game.game.stage.disableVisibilityChange = true;
        window.onfocus = null;
        window.onblur = null;
        // Setup Analytics
        Game.analytics = new util.Analytics(Game.themeData["googleAnalyticsKey"], Game.themeData["flurryKey"]);
        Game.analytics.pageview("GameInit");
        // Setup Save
        Game.save = new util.Save();
        // Setup Test
        Game.test = new util.Test();
        // Init Playte.st
        Game.playTest = new util.PlayTest(Game.themeData["playtestKey"]);
        util.Debug.logScalingInfo();
        if (Game.save.load("muted") == true) {
            util.Sound.mute();
        }
        Game.game.state.start("PrerollState");
    };
    /**
     * Add a state to the game
     *
     * @param  {string}         stateName
     * @param  {states.IState}  state
     */
    Game.addState = function (stateName, state) {
        Game._states[stateName] = state;
    };
    /**
     * Scale a retina (working space) value to the actual game space
     *
     * @param   {number}  value
     *
     * @return  {number}
     */
    Game.scale = function (value) {
        if (util.Scale.imageScale == undefined)
            util.Debug.error("You cannot use Game.scale before util.Scale.setup() is ran");
        return Math.round(util.Scale.imageScale * value);
    };
    Game.unscale = function (value) {
        if (util.Scale.imageScale == undefined)
            util.Debug.error("You cannot use Game.unscale before util.Scale.setup() is ran");
        return Math.round(value / util.Scale.imageScale);
    };
    /**
     * Scale a retina (working space) value to the screen space
     *
     * @param   {number}  value
     *
     * @return  {number}
     */
    Game.screenScale = function (value) {
        if (util.Scale.imageScale == undefined)
            util.Debug.error("You cannot use Game.screenScale before util.Scale.setup() is ran");
        return Math.round(util.Scale.imageScale * value * util.Scale.getCanvasScale());
    };
    /**
     * Makes a screenshot of the game and returns the url in specified callback
     *
     * @param  {(string)  =>  void}  callback
     */
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
    /**
     * Open the provided url, in a new window if possible (only not on iOS)
     *
     * @param  {string}  url
     */
    Game.openUrl = function (url) {
        if (Game.game.device.iOS) {
            window.location.href = url;
        }
        else {
            window.open(url);
        }
    };
    Object.defineProperty(Game, "state", {
        /**
         * Magic alias for the current state
         *
         * @return  {Phaser.State}
         */
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
        /**
         * Magic alias for the renderer
         *
         * @return  {string}
         */
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
    Game.pokiAdSdkLoaded = false;
    /**
     *
     */
    Game.waitingForAds = false;
    /**
     * Contains all states that will be added to the game
     * this is necessary because we have to store states with string keys for Google Closure Compiler
     *
     * @type  {{[stateName:string] : states.IState}}
     */
    Game._states = {};
    return Game;
})();
var blocks;
(function (blocks) {
    var Base = (function () {
        function Base(color, shape, x, y, blockSpace, blockMargin) {
            this.shape = [[]];
            this.color = color;
            this.shape = shape;
            console.log('blockspace:', blockSpace, 'blockmargin', blockMargin);
            this.blockSpace = Game.scale(blockSpace);
            this.blockMargin = Game.scale(blockMargin);
            this._create(x, y);
        }
        Base.prototype.shapeLoop = function (callback) {
            var idx = 0;
            for (var x = 0; x < this.shape.length; x++) {
                for (var y = 0; y < this.shape[x].length; y++) {
                    if (this.shape[x][y] == 1) {
                        callback(x, y, idx);
                        idx++;
                    }
                }
            }
        };
        Base.prototype._create = function (x, y) {
            this.group = Game.game.add.group();
            this._populateGroup(this.group, x, y);
        };
        Base.prototype._populateGroup = function (group, xOffset, yOffset) {
            var _this = this;
            group.x = xOffset;
            group.y = yOffset;
            this.shapeLoop(function (x, y) {
                var block = new blocks.Block(_this.color, _this.blockSpace);
                block.x = x * (_this.blockSpace + _this.blockMargin);
                block.y = y * (_this.blockSpace + _this.blockMargin);
                group.add(block);
            });
        };
        Base.prototype.gridSize = function () {
            return [this.shape.length, this.shape[0].length];
        };
        Base.prototype.updateSpacing = function (space) {
            var _this = this;
            var block;
            this.shapeLoop(function (x, y, idx) {
                block = _this.group.getAt(idx);
                block.x = x * space;
                block.y = y * space;
            });
        };
        return Base;
    })();
    blocks.Base = Base;
})(blocks || (blocks = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var blocks;
(function (blocks) {
    var Block = (function (_super) {
        __extends(Block, _super);
        function Block(color, blockSize) {
            _super.call(this, Game.game);
            this.color = color;
            this._blockSize = blockSize;
            this._createShadow();
            this._createSprite();
        }
        Block.prototype._createSprite = function () {
            this._sprite = new Phaser.Sprite(Game.game, 0, 0, "gameobjects", this.color);
            this._sprite.width = this._blockSize;
            this._sprite.height = this._blockSize;
            this.add(this._sprite);
        };
        Block.prototype._createShadow = function () {
            var shadow = new Phaser.Sprite(Game.game, 0, 0, "gameobjects", this.color);
            shadow.anchor.setTo(.5, .5);
            this._shadowStartPosition = shadow.width / 3 + Game.scale(20);
            shadow.x = shadow.y = this._shadowStartPosition;
            shadow.tint = 0x000000;
            shadow.alpha = .2;
            shadow.width = this._blockSize;
            shadow.height = this._blockSize;
            this._shadow = shadow;
            this.add(this._shadow);
        };
        Block.prototype.setSmallShadow = function () {
            this._shadow.alpha = .2;
            this._shadow.width = this._blockSize;
            this._shadow.height = this._blockSize;
            this._shadow.x = this._shadowStartPosition;
            this._shadow.y = this._shadowStartPosition;
        };
        Block.prototype.setBigShadow = function () {
            this._shadow.alpha = .1;
            this._shadow.width = this._blockSize * 1.1;
            this._shadow.height = this._blockSize * 1.1;
            this._shadow.x = this._shadowStartPosition;
            this._shadow.y = this._shadowStartPosition;
        };
        return Block;
    })(Phaser.Group);
    blocks.Block = Block;
})(blocks || (blocks = {}));
var blocks;
(function (blocks) {
    var Draggable = (function (_super) {
        __extends(Draggable, _super);
        function Draggable(color, shape, x, y, blockSpace, blockMargin, onDragStart, onDragStop) {
            _super.call(this, color, shape, x, y, blockSpace, blockMargin);
            this.isDragging = false;
            this.dragStartScale = new Phaser.Point(.5, .5);
            this.group.addDragStart(onDragStart);
            this.group.addDragStop(onDragStop);
        }
        Draggable.prototype._create = function (x, y) {
            this.group = new util.DraggableGroup(Game.game);
            this._populateGroup(this.group, x, y);
            this.group.dragContext = this;
            // this.group.scale = new Phaser.Point(0,0);
            this.group.dragSprite.anchor.setTo(.5, .5);
            this.group.dragSprite.x = this.group.width / 2;
            this.group.dragSprite.y = this.group.height / 2;
        };
        Draggable.prototype.update = function () {
            if (this.isDragging) {
                // Slightly hacky but it works
                this.group.dragSprite.x = Game.game.input.activePointer.x;
                this.group.dragSprite.y = Game.game.input.activePointer.y;
                if (!Game.game.device.desktop) {
                    this.group.dragSprite.y -= this.group.height / 2;
                    if (util.Scale.assetType == "small") {
                        this.group.dragSprite.y -= Game.scale(200);
                    }
                    else {
                        this.group.dragSprite.y -= Game.scale(150);
                    }
                }
            }
            this.group.x = this.group.dragSprite.x - this.group.width / 2;
            this.group.y = this.group.dragSprite.y - this.group.height / 2;
        };
        Draggable.prototype.destroy = function () {
            this.group.cleanDestroy();
        };
        Draggable.prototype.updateX = function (value) {
            this.group.dragSprite.x = value;
        };
        Draggable.prototype.updateY = function (value) {
            this.group.dragSprite.y = value;
        };
        Draggable.prototype.setBoundingRect = function (width, height) {
            this.group.dragSprite.width = width;
            this.group.dragSprite.height = height;
        };
        Draggable.prototype.tweenIntoExistence = function () {
            Game.game.add.tween(this.group.scale).to({ x: .5, y: .5 }, 200, Phaser.Easing.Linear.None, true);
        };
        return Draggable;
    })(blocks.Base);
    blocks.Draggable = Draggable;
})(blocks || (blocks = {}));
var blocks;
(function (blocks) {
    var Generator = (function () {
        function Generator() {
            var shapesJson = Game.game.cache.getJSON("shapes");
            this._shapes = shapesJson["shapes"];
            this._colors = shapesJson["colors"];
            this._rotations = shapesJson["rotations"];
        }
        Generator.prototype.getShape = function (index) {
            var rotationIndex = Math.floor(Math.random() * this._rotations.length);
            var shape = JSON.parse(JSON.stringify(this._shapes[index])), rotation = this._rotations[rotationIndex];
            return Phaser.ArrayUtils.rotateMatrix(shape, rotation);
        };
        Generator.prototype.getColor = function (index) {
            return this._colors[index];
        };
        Generator.prototype.generateDraggableBlock = function (x, y, width, margin, onDragStart, onDragStop) {
            var randomIndex = this.getRandomShapeIndex();
            var color = this.getColor(randomIndex), shape = this.getShape(randomIndex);
            var draggable = new blocks.Draggable(color, shape, x, y, width, margin, onDragStart, onDragStop);
            return draggable;
        };
        Generator.prototype.getRandomShapeIndex = function () {
            return Math.floor(Math.random() * this._shapes.length);
        };
        return Generator;
    })();
    blocks.Generator = Generator;
})(blocks || (blocks = {}));
var blocks;
(function (blocks) {
    var Selector = (function () {
        function Selector(selectorHeight, amount, gridHandler) {
            this._placeHolders = [];
            this._currentShapes = [];
            this._amount = amount;
            if (Game.orientation === "landscape") {
                this._xOffset = gridHandler.offsetLeft + gridHandler.gridSize + gridHandler.betweenMargin;
            }
            else {
                this._xOffset = gridHandler.offsetLeft;
            }
            this._width = gridHandler.gridSize;
            var minMargin = gridHandler.minMargin;
            this._blockMargin = Math.max(minMargin, (gridHandler.gridSize - selectorHeight * amount) / (amount - 1));
            if (this._blockMargin > minMargin) {
                this._blockSize = selectorHeight;
            }
            else {
                this._blockSize = (gridHandler.gridSize - (minMargin * (amount - 1))) / amount;
            }
            if (Game.orientation === "landscape") {
                this._yOffset = gridHandler.offsetTop;
            }
            else {
                this._yOffset = gridHandler.offsetTop + gridHandler.gridSize + gridHandler.betweenMargin * .5;
            }
            this._generator = new blocks.Generator();
            this._gridHandler = gridHandler;
        }
        Selector.prototype.create = function () {
            for (var i = 0; i < this._amount; i++) {
                this.createSelectBox(i, this.getOffset(i));
            }
            this.createNewShapes();
        };
        Selector.prototype.createNewShapes = function () {
            this.clearCurrentShapes();
            for (var i = 0; i < this._amount; i++) {
                this.createShape(this.getOffset(i));
            }
            this.centerShapesInSelector();
            this._currentShapes.forEach(function (shape) {
                shape.tweenIntoExistence();
            });
        };
        Selector.prototype.clearCurrentShapes = function () {
            if (this._currentShapes.length > 0) {
                for (var i = 0; i < this._currentShapes.length; i++) {
                    this._currentShapes[i].group.cleanDestroy();
                }
            }
            this._currentShapes = [];
        };
        Selector.prototype.update = function () {
            for (var i = 0; i < this._currentShapes.length; i++) {
                this._currentShapes[i].update();
            }
        };
        Selector.prototype.getOffset = function (index) {
            var blockOffset = new Phaser.Point(this._xOffset, this._yOffset);
            if (index > 0) {
                if (Game.orientation === "landscape") {
                    blockOffset.y = this._yOffset + index * (this._blockSize + this._blockMargin);
                }
                if (Game.orientation === "portrait") {
                    blockOffset.x = this._xOffset + index * (this._blockSize + this._blockMargin);
                }
            }
            return blockOffset;
        };
        Selector.prototype.createSelectBox = function (index, blockOffset) {
            var sprite = Game.game.add.sprite(blockOffset.x, blockOffset.y, "interface", "hole" + (index + 1));
            sprite.width = this._blockSize;
            sprite.height = this._blockSize;
            this._placeHolders.push(sprite);
        };
        Selector.prototype.createShape = function (blockOffset) {
            var block = this._generator.generateDraggableBlock(blockOffset.x, blockOffset.y, Game.unscale(this._gridHandler.blockSpace) * 1.25, this._gridHandler.blockMargin, this.getShapeDragStartFunction(), this.getShapeDragStopFunction());
            this._currentShapes.push(block);
        };
        Selector.prototype.centerShapesInSelector = function () {
            var shapeHeight, shapeWidth, blockOffset;
            for (var i = 0; i < this._currentShapes.length; i++) {
                var shape = this._currentShapes[i];
                shapeHeight = shape.group.height;
                shapeWidth = shape.group.width;
                blockOffset = this.getOffset(i);
                shape.dragStartPosition = new Phaser.Point(blockOffset.x + this._blockSize / 2, blockOffset.y + this._blockSize / 2);
                shape.updateX(shape.dragStartPosition.x);
                shape.updateY(shape.dragStartPosition.y);
                shape.setBoundingRect(this._blockSize, this._blockSize);
            }
        };
        Selector.prototype.getShapeDragStartFunction = function () {
            var self = this;
            return function () {
                if (Game.waitingForAds)
                    return;
                this.isDragging = true;
                Game.game.add.tween(this.group.scale).to({ x: .75, y: .75 }, 200, Phaser.Easing.Linear.None, true);
                this.updateSpacing((self._gridHandler.blockMargin + self._gridHandler.blockSpace) / .75);
                this.group.children.forEach(function (block) {
                    block.setBigShadow();
                });
                // move the dragging object to top
                Game.game.world.bringToTop(this.group);
            };
        };
        Selector.prototype.getShapeDragStopFunction = function () {
            var self = this;
            return function () {
                this.isDragging = false;
                var position = self._gridHandler.determinePosition(this);
                if (position && self._gridHandler.checkPositions(this, position, true)) {
                    util.Sound.playFx("placed");
                    // Position free, place shape on grid
                    self._gridHandler.placeBlock(this, position);
                    this.group.cleanDestroy();
                    var shapeIndex = self._currentShapes.indexOf(this);
                    self._currentShapes.splice(shapeIndex, 1);
                    if (self._currentShapes.length === 0) {
                        self.createNewShapes();
                    }
                    self._gridHandler.handleResult(self._gridHandler.ruleHandler.checkRules(), self._currentShapes);
                }
                else {
                    // Position not free, place shape back in start position
                    util.Sound.playFx("incorrect");
                    if (!this.isTweening) {
                        Game.game.add.tween(this.group.scale).to(this.dragStartScale, 200, Phaser.Easing.Linear.None, true);
                    }
                    this.updateSpacing(self._gridHandler.blockSpace + self._gridHandler.blockMargin);
                    Game.game.add.tween(this.group.dragSprite).to(this.dragStartPosition, 200, Phaser.Easing.Linear.None, true);
                    this.group.children.forEach(function (block) {
                        block.setSmallShadow();
                    });
                }
                this.isDragging = false;
            };
        };
        return Selector;
    })();
    blocks.Selector = Selector;
})(blocks || (blocks = {}));
var cfg;
(function (cfg) {
    var Settings = (function () {
        function Settings() {
        }
        Settings.getOrientationSettings = function () {
            return Settings._orientationSettings[Game.orientation];
        };
        Settings.forcedAssetType = null;
        // Resolution
        Settings.forcedOrientation = null;
        Settings._orientationSettings = {
            'landscape': {
                workingWidth: 1920,
                minResolution: new util.Dimensions(320, 240),
                minRatio: 0.5625,
                maxRatio: 0.5625,
            },
            'portrait': {
                workingWidth: 1080,
                minResolution: new util.Dimensions(240, 320),
                minRatio: 1.6,
                maxRatio: 1.33,
            }
        };
        return Settings;
    })();
    cfg.Settings = Settings;
})(cfg || (cfg = {}));
///<reference path="cfg/Settings.ts" />
/**
 * Bootstrap
 *
 * Handles the starting of the game, and checking of window orientation
 */
// Start bootstrap logic upon document ready
if (document.readyState != "loading") {
    bootstrap();
}
else {
    document.addEventListener("DOMContentLoaded", bootstrap);
}
function bootstrap() {
    // Only check orientation if it's necessary, and we are not in DEBUG mode, otherwise just start the game
    var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) != null, visibleCheckStarted = false, gameStarted = false;
    if (cfg.Settings.forcedOrientation == null || DEBUG_ENABLED || !isMobile) {
        startVisibilityCheck();
    }
    else {
        // Create orientation graphic container
        var orientationDiv = document.createElement("div");
        orientationDiv.style.cssText = "position:absolute;left:0;top:0;right:0;bottom:0;background:#fff;text-align:center";
        orientationDiv.style.display = "none";
        document.body.appendChild(orientationDiv);
        // Create orientation align helper
        var helper = document.createElement("div");
        helper.style.cssText = "display:inline-block;height:100%;vertical-align:middle;";
        orientationDiv.appendChild(helper);
        // Create orientation graphic
        var orientationGraphic = document.createElement("img");
        orientationGraphic.src = "assets/static/orientation-" + cfg.Settings.forcedOrientation + ".png";
        orientationGraphic.style.cssText = "max-width: 50%;max-height:50%;vertical-align:middle;";
        orientationDiv.appendChild(orientationGraphic);
        // Check orientation
        checkOrientation();
        // Listen for orientation changes
        window.addEventListener("resize", checkOrientation, false);
        window.addEventListener("focus", checkOrientation, false);
        function checkOrientation() {
            var orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
            if (orientation == cfg.Settings.forcedOrientation) {
                orientationDiv.style.display = "none";
                startVisibilityCheck();
            }
            else {
                orientationDiv.style.display = "block";
            }
        }
    }
    // Start visibility check
    function startVisibilityCheck() {
        if (visibleCheckStarted)
            return;
        visibleCheckStarted = true;
        // Check if the game's iframe is visible, if not re-check every .5 seconds
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
var grid;
(function (grid) {
    var Handler = (function () {
        function Handler(size, disabledPositions) {
            var _this = this;
            this._contents = [[]];
            this._innerMargin = Game.scale(20);
            this.blockMargin = Game.scale(6);
            this.offsetLeft = Game.scale(30);
            this.minMargin = Game.scale(10);
            this._supportArray = [];
            var scoreSize = Game.scale(280);
            var selectorSize = Game.scale(397);
            this.size = size || new Phaser.Point(10, 10);
            this._disabledPositions = disabledPositions || [[]];
            this.offsetTop = scoreSize * .8;
            var availableHeight = Game.dimensions.height - scoreSize;
            if (Game.orientation === "landscape") {
                this.offsetTop = Game.scale(50);
                var availableHeight = Game.dimensions.height - Game.scale(100);
                var maxGridHeight = Game.dimensions.height;
            }
            else {
                var maxGridHeight = Game.dimensions.height - scoreSize - selectorSize - this._innerMargin * 4;
            }
            var minMargin = this.minMargin;
            if (Game.orientation == "landscape") {
                this.betweenMargin = Math.max(minMargin, ((availableHeight - maxGridHeight) / 2));
            }
            else {
                this.betweenMargin = Math.max(minMargin, ((availableHeight - maxGridHeight) / 4));
            }
            if (this.betweenMargin > minMargin) {
                this.gridSize = maxGridHeight;
            }
            else {
                this.gridSize = availableHeight - (minMargin * 4);
            }
            if (Game.orientation === "landscape") {
                this.offsetLeft = Game.scale(400);
            }
            else {
                this.offsetLeft = (Game.dimensions.width - this.gridSize) * .5;
            }
            this._scoreHandler = new ui.Score(new Phaser.Point(0, scoreSize + this.betweenMargin));
            this.blockSpace = (this.gridSize - this._innerMargin * 2 - (this.blockMargin * (this.size.x - 1))) / this.size.x;
            this._shapeSelector = new blocks.Selector(selectorSize, 3, this);
            this.gameOver = new ui.GameOver(function () {
                _this.restart();
            });
            this.ruleHandler = new rules.Handler([
                new rules.VerticalRow(this),
                new rules.HorizontalRow(this)
            ]);
        }
        Handler.prototype.create = function () {
            this._createBackground();
            this._createLocations();
            this._shapeSelector.create();
            this._scoreHandler.create();
        };
        Handler.prototype.restart = function () {
            if (Game.pokiAdSdkLoaded) {
                PokiSDK.gameplayStart();
            }
            this.gridLoop(function (x, y, position) {
                position.clearContent();
            });
            this._scoreHandler.setScore(0);
            this._shapeSelector.createNewShapes();
        };
        Handler.prototype._createBackground = function () {
            this._background = Game.game.add.sprite(this.offsetLeft, this.offsetTop, "interface", "grid-bg");
            this._background.height = this.gridSize * (this._background.height / this._background.width);
            this._background.width = this.gridSize;
        };
        Handler.prototype._createLocations = function () {
            var blockSpaceWithMargin = this.blockSpace + this.blockMargin, disabled = false;
            for (var x = 0; x < this.size.x; x++) {
                for (var y = 0; y < this.size.y; y++) {
                    if (x === 0) {
                        this._contents[y] = [];
                    }
                    var position = new Phaser.Point();
                    position.x = this.offsetLeft + this._innerMargin + x * blockSpaceWithMargin;
                    position.y = this.offsetTop + this._innerMargin + y * blockSpaceWithMargin;
                    if (typeof this._disabledPositions[x] !== "undefined" && typeof this._disabledPositions[x][y] !== "undefined") {
                        disabled = this._disabledPositions[x][y];
                    }
                    else {
                        disabled = false;
                    }
                    this._contents[x][y] = new grid.Position(position, this.blockSpace, y + x, false);
                }
            }
        };
        Handler.prototype.update = function () {
            this._shapeSelector.update();
        };
        Handler.prototype.placeBlock = function (block, gridOffset) {
            var _this = this;
            var currentPosition;
            block.shapeLoop(function (x, y) {
                currentPosition = _this.getPosition([x + gridOffset[0], y + gridOffset[1]]);
                currentPosition.setContent(block.color);
                _this._scoreHandler.increaseScore(1);
                return true;
            });
        };
        Handler.prototype._checkGameOver = function (shapes) {
            var _this = this;
            var gameOver = true;
            for (var i = 0; i < shapes.length; i++) {
                this.gridLoop(function (x, y, position) {
                    if (_this.checkPositions(shapes[i], [x, y])) {
                        gameOver = false;
                        return true;
                    }
                });
                if (gameOver === false)
                    break;
            }
            if (gameOver) {
                console.log();
                if (Game.pokiAdSdkLoaded)
                    PokiSDK.gameplayStop();
                this.gameOver.showGameOver();
            }
            return gameOver;
        };
        Handler.prototype.checkPositions = function (block, gridOffset, log) {
            var _this = this;
            if (log === void 0) { log = false; }
            var isFree = true;
            block.shapeLoop(function (x, y) {
                if (!_this.checkIfPositionFree([x + gridOffset[0], y + gridOffset[1]])) {
                    isFree = false;
                    return false;
                }
                return true;
            });
            return isFree;
        };
        Handler.prototype.gridLoop = function (callback) {
            var position;
            var completed = false;
            for (var x = 0; x < this._contents.length; x++) {
                for (var y = 0; y < this._contents[x].length; y++) {
                    position = this.getPosition([x, y]);
                    completed = callback(x, y, position);
                    if (completed)
                        break;
                }
                if (completed)
                    break;
            }
        };
        Handler.prototype.determinePosition = function (block) {
            var _this = this;
            var actualGridPosition, actualPosition = [
                block.group.x,
                block.group.y
            ], sprite, gridPosition = null;
            this.gridLoop(function (x, y, position) {
                sprite = position.getBackgroundSprite();
                actualGridPosition = [sprite.x, sprite.y];
                if (actualPosition[0] > actualGridPosition[0] - _this.blockSpace &&
                    actualPosition[0] < actualGridPosition[0] &&
                    actualPosition[1] > actualGridPosition[1] - _this.blockSpace &&
                    actualPosition[1] < actualGridPosition[1]) {
                    gridPosition = [x, y];
                    return true;
                }
                return false;
            });
            return gridPosition;
        };
        Handler.prototype.checkIfPositionFree = function (targetPosition) {
            var position = this.getPosition(targetPosition);
            if (position === null || position.hasContents()) {
                return false;
            }
            else {
                return true;
            }
        };
        /**
         * First Array are the successful rows, the second array are the successful columns
         * @param result
         */
        Handler.prototype.handleResult = function (result, shapes) {
            for (var i = 0; i < result[0].length; i++) {
                this.clearRow(result[0][i]);
            }
            for (var j = 0; j < result[1].length; j++) {
                this.clearColumn(result[1][j]);
            }
            var totalRows = result[0].length + result[1].length;
            if (totalRows > 0) {
                this._scoreHandler.increaseScore((totalRows - 1) * 10);
                PokiSDK.happyTime(Math.min(1, totalRows / 7));
            }
            if (!this._checkGameOver(shapes) && totalRows > 1) {
                this._supportText();
            }
        };
        Handler.prototype.clearRow = function (rowIndex) {
            var _this = this;
            var delay = 0;
            this.gridLoop(function (x, y, position) {
                if (y === rowIndex && position.hasContents()) {
                    position.clearContent(delay * 50);
                    _this._scoreHandler.increaseScore(1);
                    delay++;
                }
            });
        };
        Handler.prototype.clearColumn = function (rowIndex) {
            var _this = this;
            var delay = 0;
            this.gridLoop(function (x, y, position) {
                if (x === rowIndex && position.hasContents()) {
                    position.clearContent(delay * 50);
                    _this._scoreHandler.increaseScore(1);
                    delay++;
                }
            });
        };
        Handler.prototype._supportText = function () {
            if (this._supportArray.length == 0) {
                for (var i = 1; i <= 13; i++)
                    this._supportArray.push(i);
            }
            var idx = this._supportArray.splice(Math.round((this._supportArray.length - 1) * Math.random()), 1)[0], text = Game.game.add.sprite(Game.game.world.centerX, this.offsetTop + this.gridSize / 2, "support", idx), maxAngle = 30;
            text.anchor.setTo(.5, .5);
            text.scale.setTo(0, 0);
            text.angle = Math.round(Math.random() * maxAngle * 2);
            if (text.angle > maxAngle) {
                text.angle = (text.angle - maxAngle) * -1;
            }
            var inTween = Game.game.add.tween(text.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Bounce.Out, true), tiltTween = Game.game.add.tween(text).to({ angle: 0 }, 2000, Phaser.Easing.Bounce.Out, true);
            inTween.onComplete.add(function () {
                window.setTimeout(function () {
                    var outTween = Game.game.add.tween(text).to({ alpha: 0 }, 500, Phaser.Easing.Bounce.InOut, true);
                    outTween.onComplete.add(function () {
                        text.destroy();
                    });
                }, 200);
            });
        };
        Handler.prototype.getPosition = function (targetPosition) {
            if (typeof this._contents[targetPosition[0]] !== 'undefined' && typeof this._contents[targetPosition[0]][targetPosition[1]] !== 'undefined' &&
                this._contents[targetPosition[0]][targetPosition[1]] !== null) {
                return this._contents[targetPosition[0]][targetPosition[1]];
            }
            else {
                return null;
            }
        };
        return Handler;
    })();
    grid.Handler = Handler;
})(grid || (grid = {}));
var grid;
(function (grid) {
    var Position = (function () {
        function Position(spritePosition, width, creationDelay, disabled) {
            var _this = this;
            if (creationDelay === void 0) { creationDelay = 0; }
            if (disabled === void 0) { disabled = false; }
            this.item = null;
            this._isNewlyFilled = true;
            this._emptySprite = null;
            this._particleAmount = 5;
            var randomDigit = Math.floor(Math.random() * 5) + 1;
            this._spritePosition = spritePosition;
            this._emptySprite = Game.game.add.sprite(spritePosition.x + width * .5, spritePosition.y + width * .5, "gameobjects", "empty" + randomDigit);
            this._emptySprite.width = 0;
            this._emptySprite.height = 0;
            this._emptySprite.anchor.set(.5, .5);
            this._width = width;
            this._isDisabled = disabled;
            setTimeout(function () {
                Game.game.add.tween(_this._emptySprite).to({ width: width, height: width }, 200, Phaser.Easing.Bounce.InOut[-2], true);
            }, creationDelay * 20);
        }
        Position.prototype.hasContents = function () {
            return (this.item !== null || this._isDisabled === true);
        };
        Position.prototype.setContent = function (color) {
            if (!(Game.game.device.android || util.Scale.assetType == "small")) {
                this._emitter = Game.game.add.emitter(0, 0);
                this._emitter.makeParticles("gameobjects", "particle-star", this._particleAmount);
                Game.game.world.bringToTop(this._emitter);
            }
            this.item = Game.game.add.sprite(this._spritePosition.x, this._spritePosition.y, "gameobjects", color);
            this.item.width = this._width;
            this.item.height = this._width;
            this._emitClouds();
        };
        Position.prototype._emitClouds = function () {
            var _this = this;
            if (this._emitter == null)
                return;
            var amount = this._particleAmount;
            this._emitter.area.width = this.item.width * 1.5;
            this._emitter.area.height = this.item.height * 1.5;
            this._emitter.x = this.item.x + this.item.width / 2;
            this._emitter.y = this.item.y + this.item.height / 2;
            this._emitter.setRotation(0, 0);
            this._emitter.minParticleScale = .5;
            this._emitter.maxParticleScale = .5;
            this._emitter.setAlpha(0, 0);
            this._emitter.start(true, 500, null, amount);
            this._emitter.update();
            // Manually set particle speed for each particle
            var minSpeed = Game.scale(150), maxSpeed = Game.scale(200), idx = 0, speeds;
            this._emitter.forEachAlive(function (p) {
                p.body.velocity.x = Game.game.rnd.between(minSpeed, maxSpeed);
                p.body.velocity.y = Game.game.rnd.between(minSpeed, maxSpeed);
                if (idx <= Math.round(amount / 2)) {
                    p.body.velocity.x *= -1;
                }
                if (idx <= Math.round(amount / 4) || idx >= (Math.round(amount / 4) * 3)) {
                    p.body.velocity.y *= -1;
                }
                idx++;
            }, this);
            // Fade out particles
            var particleEffects = function () {
                var aliveParticles = 0;
                _this._emitter.forEachAlive(function (p) {
                    var scale = Phaser.Math.linearInterpolation([0, .5], p.lifespan / _this._emitter.lifespan);
                    p.scale.setTo(scale, scale);
                    var alpha = Phaser.Math.linearInterpolation([0, .5, 1, 0], p.lifespan / _this._emitter.lifespan);
                    p.alpha = alpha;
                    aliveParticles++;
                }, _this);
                if (aliveParticles == 0) {
                    Game.state.removeOnUpdate(particleEffects);
                    _this._emitter.destroy();
                }
            };
            Game.state.onUpdate(particleEffects);
            Game.game.world.bringToTop(this.item);
        };
        Position.prototype.getSprite = function () {
            if (this.hasContents()) {
                return this.item;
            }
            return this._emptySprite;
        };
        Position.prototype.getBackgroundSprite = function () {
            return this._emptySprite;
        };
        Position.prototype.clearContent = function (delay) {
            if (delay === void 0) { delay = 0; }
            if (this.hasContents()) {
                var tmpItem = this.item;
                this.item = null;
                tmpItem.anchor.x = .5;
                tmpItem.anchor.y = .5;
                tmpItem.x += tmpItem.width * 0.5;
                tmpItem.y += tmpItem.height * 0.5;
                var timeout = setTimeout(function () {
                    util.Sound.playFx("remove");
                    var tween = Game.game.add.tween(tmpItem.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Bounce.InOut[-2], true);
                    tween.onComplete.add(function () {
                        if (tmpItem != null) {
                            tmpItem.destroy();
                            tmpItem = null;
                        }
                    });
                    window.clearTimeout(timeout);
                }, delay);
                this._isNewlyFilled = true;
            }
        };
        return Position;
    })();
    grid.Position = Position;
})(grid || (grid = {}));
var rules;
(function (rules) {
    var Base = (function () {
        function Base(grid) {
            this._grid = null;
            this._grid = grid;
        }
        Base.prototype.check = function () {
            //should be extended
            return null;
        };
        return Base;
    })();
    rules.Base = Base;
})(rules || (rules = {}));
var rules;
(function (rules_1) {
    var Handler = (function () {
        function Handler(rules) {
            this._rules = [];
            this._rules = rules;
        }
        Handler.prototype.checkRules = function () {
            var result = [];
            for (var i = 0; i < this._rules.length; i++) {
                result.push(this._rules[i].check());
            }
            return result;
        };
        return Handler;
    })();
    rules_1.Handler = Handler;
})(rules || (rules = {}));
var rules;
(function (rules) {
    var HorizontalRow = (function (_super) {
        __extends(HorizontalRow, _super);
        function HorizontalRow() {
            _super.apply(this, arguments);
        }
        HorizontalRow.prototype.check = function () {
            var _this = this;
            var successfulColumns = [];
            var columnsFilled = [];
            this._grid.gridLoop(function (x, y, position) {
                if (position.hasContents()) {
                    if (typeof columnsFilled[x] === "undefined") {
                        columnsFilled[x] = 1;
                    }
                    else {
                        columnsFilled[x]++;
                        if (columnsFilled[x] === _this._grid.size.x) {
                            //successful row is successful
                            successfulColumns.push(x);
                        }
                    }
                }
            });
            return successfulColumns;
        };
        return HorizontalRow;
    })(rules.Base);
    rules.HorizontalRow = HorizontalRow;
})(rules || (rules = {}));
var rules;
(function (rules) {
    var VerticalRow = (function (_super) {
        __extends(VerticalRow, _super);
        function VerticalRow() {
            _super.apply(this, arguments);
        }
        VerticalRow.prototype.check = function () {
            var _this = this;
            var successfulRows = [];
            var rowsFilled = [];
            this._grid.gridLoop(function (x, y, position) {
                if (position.hasContents()) {
                    if (typeof rowsFilled[y] === "undefined") {
                        rowsFilled[y] = 1;
                    }
                    else {
                        rowsFilled[y]++;
                        if (rowsFilled[y] === _this._grid.size.x) {
                            successfulRows.push(y);
                        }
                    }
                }
            });
            return successfulRows;
        };
        return VerticalRow;
    })(rules.Base);
    rules.VerticalRow = VerticalRow;
})(rules || (rules = {}));
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
            util.Debug.calcAvgFPS();
            this._updateCallbacks.forEach(function (callback, idx) {
                if (callback == null)
                    return;
                callback.callback();
                if (callback.runOnce) {
                    _this._updateCallbacks.splice(idx);
                }
            });
            // FPS tracking phase is over
            //this._runOncePerNSteps("TrackFPS", 500, () => {
            //	util.Debug.trackFPS();
            //});
        };
        BaseState.prototype.render = function () {
            var _this = this;
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
        BaseState.prototype._resetCameraAndBounds = function () {
            var x = 0, y = 0, width = Game.game.camera.width, height = Game.game.camera.height;
            Game.game.world.bounds.setTo(x, y, width, height);
            if (Game.game.camera.bounds) {
                Game.game.camera.bounds.setTo(x, y, width, height);
            }
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
            this._gridHandler = null;
        }
        GameState.prototype.init = function () {
            this._gridHandler = new grid.Handler();
        };
        GameState.prototype.create = function () {
            var _this = this;
            Game.analytics.pageview("GameState");
            Game.game.add.tileSprite(0, 0, Game.dimensions.width, Game.dimensions.height, "preroll", "bg");
            // Create a screenshot every 10 seconds for PlayTest
            // Game.game.time.events.loop(10000, Game.playTest.screenshot, Game.playTest);
            this._gridHandler.create();
            this.onUpdate(function () {
                _this._gridHandler.update();
            });
            this._initSoundButton();
            // this._floodMemoryAndCPU();
            console.log('sdk loaded', Game.pokiAdSdkLoaded);
            if (Game.pokiAdSdkLoaded) {
                PokiSDK.gameplayStart();
            }
        };
        GameState.prototype._floodMemoryAndCPU = function () {
            var downscale = [];
            var upscale = [];
            // Flood that memory
            for (var i = 0; i < 1000; i++) {
                var sprite = Game.game.add.sprite(Game.scale(120), Game.scale(120), "gameobjects", "ruby");
                downscale[i] = Game.game.add.tween(sprite.scale).to({ x: Math.random(), y: Math.random() }, 500, Phaser.Easing.Linear.None);
                upscale[i] = Game.game.add.tween(sprite.scale).to({ x: Math.random(), y: Math.random() }, 500, Phaser.Easing.Linear.None);
                downscale[i].start();
                sprite.alpha = Math.random();
                downscale[i].onComplete.add(function () {
                    upscale[this.i].start();
                }, { i: i });
                upscale[i].onComplete.add(function () {
                    downscale[this.i].start();
                }, { i: i });
                Game.game.physics.enable(sprite, Phaser.Physics.ARCADE);
                sprite.body.angularVelocity = Math.random() * 500;
            }
        };
        GameState.prototype._initSoundButton = function () {
            var soundOnButton, soundOffButton;
            soundOnButton = Game.game.add.button(0, 0, "interface", function (button, pointer, isOver) {
                if (!isOver)
                    return;
                Game.analytics.event("Button", "SoundOffMenu", "clicked");
                soundOnButton.visible = false;
                soundOffButton.visible = true;
                util.Sound.mute();
            }, this, "buttons/sound-hover", "buttons/sound", "buttons/sound-down");
            soundOffButton = Game.game.add.button(0, 0, "interface", function (button, pointer, isOver) {
                if (!isOver)
                    return;
                Game.analytics.event("Button", "SoundOnMenu", "clicked");
                soundOnButton.visible = true;
                soundOffButton.visible = false;
                util.Sound.unMute();
                util.Sound.playFx("button");
            }, this, "buttons/sound-off-hover", "buttons/sound-off", "buttons/sound-off-down");
            soundOnButton.scale.setTo(.5, .5);
            soundOffButton.scale.setTo(.5, .5);
            soundOnButton.x = soundOffButton.x = Game.dimensions.width - soundOnButton.width - Game.scale(20);
            soundOnButton.y = soundOffButton.y = Game.scale(20);
            soundOffButton.visible = false;
            if (util.Sound.muted) {
                soundOffButton.visible = true;
                soundOnButton.visible = false;
            }
        };
        return GameState;
    })(states.BaseState);
    states.GameState = GameState;
})(states || (states = {}));
// Add this state to the Game.states
Game.addState("GameState", states.GameState);
var states;
(function (states) {
    var MenuState = (function (_super) {
        __extends(MenuState, _super);
        function MenuState() {
            _super.apply(this, arguments);
        }
        /**
         * Create the menu
         */
        MenuState.prototype.create = function () {
            var _this = this;
            Game.analytics.pageview("MenuState");
            // Background
            Game.game.add.tileSprite(0, 0, Game.dimensions.width, Game.dimensions.height, "preroll", "bg");
            // Light rays
            this._lightRays = Game.game.add.sprite(Game.game.world.centerX, Game.game.world.centerY, "interface", "lightrays");
            this._lightRays.anchor.x = .5;
            this._lightRays.anchor.y = .5;
            this._lightRays.alpha = .5;
            // Draw logo
            var logo = Game.game.add.sprite(Game.game.world.centerX, Game.game.world.centerY, "preroll", "logo");
            logo.scale.setTo(.7, .7);
            logo.y -= logo.height / 2 + Game.scale(100);
            logo.anchor.x = .5;
            // Poki Logo
            // var pokiLogo: Phaser.Sprite = Game.game.add.sprite(logo.x, logo.y, "preroll", "poki-logo-small");
            // pokiLogo.anchor.setTo(.5,.5);
            // pokiLogo.scale.setTo(.5, .5);
            // pokiLogo.y -= pokiLogo.height + Game.scale(40);
            // this._lightRays.y = logo.y + Game.scale(160);
            // pokiLogo.inputEnabled = true;
            // pokiLogo.input.useHandCursor = true;
            // pokiLogo.events.onInputOver.add(() => {
            // 	if (pokiLogo.scale.x == 1) {
            // 		pokiLogo.scale.setTo(1.2, 1.2);
            // 	}
            // });
            // pokiLogo.events.onInputOut.add(() => {
            // 	pokiLogo.scale.setTo(1, 1);
            // });
            // pokiLogo.events.onInputDown.add(() => {
            // 	Game.analytics.event("Button", "PokiMenu", "clicked");
            // 	Game.openUrl("http://poki.com");
            // }, this);
            var playButton = Game.game.add.button(Game.game.world.centerX, 0, "interface", function (button, pointer, isOver) {
                if (!isOver)
                    return;
                util.Sound.playFx("button");
                _this._start();
            }, this, "buttons/play-hover", "buttons/play", "buttons/play-down");
            playButton.y = logo.y + logo.height + ((Game.dimensions.height - logo.y - logo.height) / 2);
            playButton.scale.setTo(.5, .5);
            playButton.anchor.setTo(.5, .5);
            // Co branding
            var maxDimensions = new util.Dimensions(playButton.width, Game.scale(100));
            if (Game.game.cache.checkKey(Phaser.Cache.IMAGE, "cobranding")) {
                var coLogo = Game.game.add.sprite(Game.game.world.centerX, playButton.y, "cobranding");
                coLogo.anchor.setTo(.5, .5);
                // Find scale
                var widthRatio = coLogo.width / maxDimensions.width, heightRatio = coLogo.height / maxDimensions.height, scale;
                if (widthRatio > heightRatio) {
                    scale = 1 / widthRatio;
                }
                else {
                    scale = 1 / heightRatio;
                }
                scale = Math.min(scale, 1);
                coLogo.scale.setTo(scale, scale);
                coLogo.y = Game.dimensions.height - coLogo.height - Game.scale(10);
                playButton.y = logo.y + logo.height + ((Game.dimensions.height - logo.y - logo.height - coLogo.height - Game.scale(10)) / 2);
            }
        };
        MenuState.prototype.update = function () {
            _super.prototype.update.call(this);
            this._lightRays.rotation += 0.0002 * Game.game.time.elapsed;
        };
        /**
         * Starts the game
         */
        MenuState.prototype._start = function () {
            if (Game.pokiAdSdkLoaded) {
                PokiSDK.commercialBreak()
                    .then(function () {
                    Game.game.state.start("GameState");
                });
            }
            else {
                Game.game.state.start("GameState");
            }
        };
        return MenuState;
    })(states.BaseState);
    states.MenuState = MenuState;
})(states || (states = {}));
// Add this state to Game.states
Game.addState("MenuState", states.MenuState);
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
            /**
             * The time at which this state was started
             *
             * @type  {number}
             */
            this._startTime = 0;
            /**
             * Loader functions that are called sequentially after another
             *
             * @type  {{():void}[]}
             */
            this._loaders = [
                // Load images
                function () {
                    _this._loaderPercentageAllocation = 100;
                    var images = Game.game.cache.getJSON("images");
                    for (var idx in images[util.Scale.assetType]) {
                        var path = images[util.Scale.assetType][idx], key = path.split("/").splice(3).join("/");
                        // Preroll images were already loaded in the PrerollState
                        if (key != "preroll") {
                            Game.game.load.atlasJSONHash(key, path + ".png", path + ".json");
                            // Add JSON to cleanup immediately as it isn't needed in cache anymore
                            util.Cleaner.cleanupCache("JSON", key);
                        }
                    }
                    // Load sound
                    var sfx = [
                        "button",
                        "incorrect",
                        "placed",
                        "remove"
                    ];
                    for (var idx in sfx) {
                        Game.game.load.audio(sfx[idx], ["assets/audio/" + sfx[idx] + ".wav"]);
                    }
                    // Need themeData for Analytics (amongst other things)
                    Game.game.load.json("theme", "assets/data/theme.json");
                    // shapes data for game shapes
                    Game.game.load.json("shapes", "assets/data/shapes.json");
                    // Add images JSON to cleanup
                    util.Cleaner.addToCacheCleanupQueue("JSON", "images");
                }
            ];
        }
        /**
         * Loads the UI and starts the preloading process
         */
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
        };
        /**
         * Loads the next loader function in sequence
         */
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
        /**
         * Called after loading is done
         */
        PreloadState.prototype._done = function () {
            Game.analytics.event("LoadTimes", "Preload", "Time", (Date.now() - this._startTime));
            PokiSDK.gameLoadingFinished();
            util.Debug.log("Preload finished in " + (Date.now() - this._startTime) / 1000 + " seconds");
            // Start the game
            Game.game.state.start("MenuState");
        };
        return PreloadState;
    })(states.BaseState);
    states.PreloadState = PreloadState;
})(states || (states = {}));
// Add this state to Game.states
Game.addState("PreloadState", states.PreloadState);
var states;
(function (states) {
    var PrerollState = (function (_super) {
        __extends(PrerollState, _super);
        function PrerollState() {
            _super.apply(this, arguments);
        }
        /**
         * Preload assets required for the preroll
         */
        PrerollState.prototype.preload = function () {
            // Load images required for preroll
            var images = Game.game.cache.getJSON("images");
            for (var idx in images[util.Scale.assetType]) {
                var path = images[util.Scale.assetType][idx], key = path.split("/").splice(3).join("/");
                // We only load the images required for the preroll and the preloader here, the rest is loaded in PreloadState
                if (key != "preroll")
                    continue;
                Game.game.load.atlasJSONHash(key, path + ".png", path + ".json");
                util.Cleaner.addToCacheCleanupQueue("JSON", key);
            }
        };
        /**
         * Create the preroll
         */
        PrerollState.prototype.create = function () {
            Game.analytics.pageview("PrerollState");
            this._initBackground();
            // this._initLogo();
            // Start the PreloadState after a timeout
            // window.setTimeout(() => {
            this._fadeOut(function () {
                Game.game.state.start("PreloadState");
            });
            // }, 2000);
        };
        PrerollState.prototype._initBackground = function () {
            Game.game.stage.backgroundColor = 0x39baea;
        };
        PrerollState.prototype._initLogo = function () {
            var pokiLogo = Game.game.add.sprite(Game.game.world.centerX, 0, "preroll", "poki-logo");
            pokiLogo.y = -pokiLogo.height;
            pokiLogo.anchor.set(0.5, 0.5);
            if (Game.orientation === "portrait") {
                pokiLogo.scale.set(.7, .7);
            }
            // Tween in the logo
            var tween = Game.game.add.tween(pokiLogo).to({
                y: Game.game.world.centerY
            }, 1000, Phaser.Easing.Bounce.Out, true);
            util.Cleaner.addToDestroyQueue(pokiLogo);
            util.Cleaner.addToDestroyQueue(tween);
        };
        PrerollState.prototype.destroy = function () {
            util.Cleaner.cleanupAll();
        };
        return PrerollState;
    })(states.BaseState);
    states.PrerollState = PrerollState;
})(states || (states = {}));
// Add this state to Game.states
Game.addState("PrerollState", states.PrerollState);
var ui;
(function (ui) {
    var GameOver = (function () {
        function GameOver(restartFunction) {
            var _this = this;
            this._sprites = null;
            this._restartButton = null;
            this._gameOverIsShown = false;
            this._overlaySprite = null;
            this._sprites = Game.game.add.group();
            this._sprites.x = Game.game.world.centerX;
            this._sprites.y = -Game.game.world.centerY;
            this._overlaySprite = util.Sprite.createSprite(Game.dimensions.width, Game.dimensions.height, { r: 38, g: 45, b: 75 });
            this._overlaySprite.alpha = .5;
            this._overlaySprite.visible = false;
            Game.game.add.existing(this._overlaySprite);
            var gameOverSprite = Game.game.add.sprite(0, Game.scale(-150), "interface", "gameover");
            gameOverSprite.anchor.y = 1;
            gameOverSprite.anchor.x = .5;
            gameOverSprite.scale.setTo(.8, .8);
            this._sprites.add(gameOverSprite);
            var restartButton = Game.game.add.button(0, 0, "interface", function (button, pointer, isOver) {
                if (!isOver)
                    return;
                _this.hideGameOver();
                util.Sound.playFx("button");
                //init ads here
                if (Game.pokiAdSdkLoaded) {
                    PokiSDK.commercialBreak()
                        .then(restartFunction);
                }
                else {
                    restartFunction();
                }
            }, this, "buttons/retry-hover", "buttons/retry", "buttons/retry-down");
            restartButton.anchor.x = .5;
            this._restartButton = restartButton;
            this._sprites.add(restartButton);
            this._sprites.visible = false;
        }
        GameOver.prototype.showGameOver = function () {
            Game.analytics.pageview("GameOver");
            Game.analytics.event("HighScore", "HighScore", "HighScore", Game.save.load("highScore"));
            this._sprites.visible = true;
            this._overlaySprite.visible = true;
            Game.game.world.bringToTop(this._overlaySprite);
            Game.game.world.bringToTop(this._sprites);
            Game.game.add.tween(this._sprites).to({
                y: Game.game.world.centerY
            }, 1000, Phaser.Easing.Bounce.Out, true);
        };
        GameOver.prototype.hideGameOver = function () {
            var _this = this;
            var tween = Game.game.add.tween(this._sprites).to({
                y: -Game.game.world.centerY
            }, 1000, Phaser.Easing.Bounce.Out, true);
            this._overlaySprite.visible = false;
            tween.onComplete.add(function () {
                _this._sprites.visible = false;
            });
            this._gameOverIsShown = false;
        };
        return GameOver;
    })();
    ui.GameOver = GameOver;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var GameUI = (function () {
        function GameUI() {
            this._sprites = null;
        }
        GameUI.prototype.init = function () {
        };
        GameUI.prototype.render = function () {
        };
        GameUI.prototype.destroy = function () {
            util.Cleaner.destroy(this._sprites);
        };
        return GameUI;
    })();
    ui.GameUI = GameUI;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var LoadUI = (function () {
        /**
         * Run draw methods
         */
        function LoadUI() {
            this._percentageLoaded = 0;
            this._drawLogos();
            this._drawLoadingBar();
            // this._drawLoadingText();
            this.updateProgressBar(0);
        }
        LoadUI.prototype._drawLogos = function () {
            Game.game.add.tileSprite(0, 0, Game.dimensions.width, Game.dimensions.height, "preroll", "bg");
            // Draw logo
            this._logo = Game.game.add.sprite(Game.game.world.centerX, Game.game.world.centerY, "preroll", "logo");
            this._logo.scale.setTo(.7, .7);
            this._logo.y -= this._logo.height / 2 + Game.scale(100);
            this._logo.anchor.x = .5;
            // Poki Logo
            // var pokiLogo: Phaser.Sprite = Game.game.add.sprite(this._logo.x, this._logo.y, "preroll", "poki-logo-small");
            // pokiLogo.scale.setTo(.5, .5);
            // pokiLogo.anchor.setTo(.5, .5);
            // pokiLogo.y -= pokiLogo.height + Game.scale(40);
            // pokiLogo.inputEnabled = true;
            // pokiLogo.input.useHandCursor = true;
            // pokiLogo.events.onInputOver.add(() => {
            // 	if (pokiLogo.scale.x == 1) {
            // 		pokiLogo.scale.setTo(1.2, 1.2);
            // 	}
            // });
            // pokiLogo.events.onInputOut.add(() => {
            // 	pokiLogo.scale.setTo(1, 1);
            // });
            // pokiLogo.events.onInputDown.add(() => {
            // 	Game.analytics.event("Button", "PokiMenu", "clicked");
            // 	Game.openUrl("http://poki.com");
            // }, this);
        };
        /**
         * Draw the loading text
         */
        LoadUI.prototype._drawLoadingText = function () {
            var textStyle = {
                font: "bold " + Game.scale(130) + "px Arial",
                fill: "#fff",
                boundsAlignH: "center",
                boundsAlignV: "middle"
            };
            this._loadingText = Game.game.add.text(0, 0, "0%", textStyle);
            this._loadingText.setTextBounds(0, 0, Game.dimensions.width, Game.scale(130));
            this._loadingText.y = Game.game.world.centerY - Game.scale(130) - Game.scale(50);
            util.Cleaner.addToDestroyQueue(this._loadingText, "LoadUI");
        };
        /**
         * Draw the preload bar
         */
        LoadUI.prototype._drawLoadingBar = function () {
            var preloadGroup = Game.game.add.group(), barWidth = Game.dimensions.width * .8;
            // First draw the background
            var background = Game.game.add.sprite(3, 0, "preroll", "load-bar-bg"); // 1px to prevent scaling whitespace
            preloadGroup.add(background);
            // Draw the preloadBar
            var bar = Game.game.add.tileSprite(3, 0, barWidth - 3, Game.scale(214), "preroll", "load-bar"); // 1px to prevent scaling whitespace
            preloadGroup.add(bar);
            bar.width = background.width = barWidth - Game.scale(136);
            bar.x = background.x = Game.scale(68);
            bar.y = background.y = Game.scale(60);
            // Draw the frame
            var frameMiddle = Game.game.add.tileSprite(0, 0, 0, 0, "preroll", "load-frame-middle");
            preloadGroup.add(frameMiddle);
            var frameLeft = Game.game.add.sprite(0, 0, "preroll", "load-frame-left");
            preloadGroup.add(frameLeft);
            var frameRight = Game.game.add.sprite(0, 0, "preroll", "load-frame-right");
            preloadGroup.add(frameRight);
            frameLeft.x = 1; // 1px to prevent scaling whitespace
            frameRight.x = barWidth - frameRight.width - 1; // 1px to prevent scaling whitespace
            frameMiddle.x = frameLeft.width;
            frameMiddle.width = barWidth - frameLeft.width - frameRight.width;
            frameMiddle.height = Game.scale(302);
            // Position preloadBar
            preloadGroup.x = Game.dimensions.width * .1;
            preloadGroup.y = this._logo.y + this._logo.height + ((Game.dimensions.height - this._logo.y - this._logo.height) / 2) - preloadGroup.height / 2;
            this._fullBarWidth = bar.width;
            this._loadingBar = bar;
            util.Cleaner.addToDestroyQueue(preloadGroup, "LoadUI");
        };
        LoadUI.prototype.updateProgressBar = function (percentage) {
            this._percentageLoaded += percentage;
            // this._loadingText.text = Math.round(this._percentageLoaded) + "%";
            this._loadingBar.width = this._fullBarWidth * this._percentageLoaded / 100;
        };
        LoadUI.prototype.destroy = function () {
            util.Cleaner.cleanupQueue("LoadUI");
        };
        return LoadUI;
    })();
    ui.LoadUI = LoadUI;
})(ui || (ui = {}));
var ui;
(function (ui) {
    var Score = (function () {
        function Score(offset) {
            this._flareShown = false;
            this._currentScore = 0;
            this._currentScoreBorder = null;
            this._highScore = 0;
            this._adScoreInterval = 1000;
            this._adScoreLimit = 1000;
            this._offset = offset;
            this._highScore = Game.save.load("highScore") || 0;
        }
        Score.prototype.increaseScore = function (increment) {
            this._currentScore += increment;
            if (this._currentScore >= this._highScore) {
                this._showFlare();
                this._highScore = this._currentScore;
                Game.save.save("highScore", this._highScore);
            }
            else {
                this._hideFlare();
            }
            this.updateScoreText();
            this._checkAdInterval();
        };
        Score.prototype._showFlare = function () {
            if (this._flareShown)
                return;
            this._flareShown = true;
            this._scoreFlare.visible = true;
            this._scoreGlow.visible = true;
        };
        Score.prototype._hideFlare = function () {
            if (!this._flareShown)
                return;
            this._flareShown = false;
            this._scoreFlare.visible = false;
            this._scoreGlow.visible = false;
        };
        Score.prototype._checkAdInterval = function () {
            var _this = this;
            if (this._currentScore > this._adScoreLimit) {
                //init ads here
                if (Game.pokiAdSdkLoaded) {
                    Game.waitingForAds = true;
                    PokiSDK.commercialBreak()
                        .then(function () {
                        Game.waitingForAds = false;
                        _this._adScoreLimit += _this._adScoreInterval;
                    });
                }
            }
        };
        Score.prototype.setScore = function (value) {
            this._currentScore = value;
            this._checkAdInterval();
            this.updateScoreText();
            if (this._currentScore >= this._highScore) {
                this._showFlare();
            }
            else {
                this._hideFlare();
            }
        };
        Score.prototype.updateScoreText = function () {
            var maxWidth, scale;
            if (this._currentScoreText) {
                maxWidth = this._currentScoreBackground.width + Game.scale(100) - Game.scale(85);
                this._currentScoreText.text = this._currentScore + "";
                if (this._currentScoreText.width > maxWidth) {
                    scale = maxWidth / this._currentScoreText.width;
                    this._currentScoreText.scale.setTo(scale, scale);
                }
            }
            if (this._highScoreText) {
                maxWidth = this._highScoreBackground.width - Game.scale(85);
                this._highScoreText.text = this._highScore + "";
                if (this._highScoreText.width > maxWidth) {
                    scale = maxWidth / this._highScoreText.width;
                    this._highScoreText.scale.setTo(scale, scale);
                }
            }
        };
        Score.prototype.create = function () {
            var _this = this;
            this._sprites = Game.game.add.group();
            if (Game.orientation === "landscape") {
                this._sprites.x = 0;
            }
            else {
                this._sprites.x = Game.game.world.centerX - Game.scale(350);
            }
            var scoreCrownBackground = Game.game.add.sprite(0, 0, "interface", "crown-back");
            scoreCrownBackground.anchor.setTo(.5, .5);
            this._scoreFlare = Game.game.add.sprite(0, 0, "interface", "score-flare");
            this._scoreFlare.anchor.setTo(.5, .5);
            this._scoreFlare.visible = false;
            this._scoreGlow = Game.game.add.sprite(0, 0, "interface", "crown-glow");
            this._scoreGlow.anchor.setTo(.5, .5);
            this._scoreGlow.alpha = 0;
            this._scoreGlow.visible = false;
            var scoreCrown = Game.game.add.sprite(0, 0, "interface", "crown");
            scoreCrown.anchor.setTo(.5, .5);
            if (Game.orientation === "landscape") {
                this._currentScoreBackground = Game.game.add.tileSprite(0, Game.scale(400), Game.scale(400), Game.scale(235), "interface", "main-score-middle");
                this._currentScoreBackground.anchor.set(0, .5);
                this._currentScoreBorder = Game.game.add.sprite(0, Game.scale(400), "interface", "main-score-right");
                this._currentScoreBorder.x = this._currentScoreBackground.width;
                this._currentScoreBorder.anchor.y = .5;
                this._highScoreBackground = Game.game.add.tileSprite(0, Game.scale(150), Game.scale(600), Game.scale(235), "interface", "high-score-middle");
                this._highScoreBackground.anchor.set(0, .5);
                this._highScoreBorder = Game.game.add.sprite(0, Game.scale(150), "interface", "high-score-right");
                this._highScoreBorder.x = this._highScoreBackground.width;
                this._highScoreBorder.anchor.set(0, .5);
                scoreCrownBackground.position.set(Game.scale(150), Game.scale(150));
                scoreCrown.position.set(Game.scale(150), Game.scale(150));
                this._scoreFlare.position.set(Game.scale(150), Game.scale(150));
                this._scoreGlow.position.set(Game.scale(150), Game.scale(150));
            }
            else {
                this._currentScoreBackground = Game.game.add.tileSprite(0, 0, Game.dimensions.width / 2, Game.scale(235), "interface", "main-score-middle");
                this._currentScoreBackground.anchor.x = 1;
                this._currentScoreBackground.anchor.y = .5;
                this._highScoreBackground = Game.game.add.tileSprite(0, 0, Game.scale(400), Game.scale(235), "interface", "high-score-middle");
                this._highScoreBackground.anchor.y = .5;
                this._highScoreBorder = Game.game.add.sprite(0, 0, "interface", "high-score-right");
                this._highScoreBorder.x = this._highScoreBackground.width;
                this._highScoreBorder.anchor.y = .5;
            }
            var fontSize = Game.scale(100);
            var fontOffset = -Game.scale(8);
            if (util.Scale.assetType == "small") {
                fontOffset = Game.scale(4);
            }
            this._currentScoreText = Game.game.add.text(0, 0, this._currentScore + "", { font: "bold " + fontSize + "pt SoupOfJustice", fill: "#fff", align: "center", strokeThickness: Game.scale(10), stroke: "#2e3762" });
            this._currentScoreText.anchor.setTo(.5, .5);
            this._currentScoreText.x = -(this._currentScoreBackground.width - Game.scale(85)) / 2;
            this._currentScoreText.y = this._currentScoreBackground.y + fontOffset;
            this._highScoreText = Game.game.add.text(0, -Game.scale(55), this._highScore + "", { font: "bold " + fontSize + "pt SoupOfJustice", fill: "#aa3d2f", align: "center" });
            this._highScoreText.anchor.setTo(.5, .5);
            this._highScoreText.x = Game.scale(85) + this._highScoreBackground.x + (this._highScoreBackground.width + Game.scale(77) - Game.scale(85)) / 2;
            this._highScoreText.y = this._highScoreBackground.y + fontOffset;
            if (Game.orientation === "landscape") {
                // this._highScoreText.anchor.setTo(.5, .5);
                this._highScoreText.position.set(Game.scale(500), Game.scale(160) + fontOffset);
                // this._currentScoreText.anchor.setTo(.5, .5);
                this._currentScoreText.position.set(Game.scale(225), Game.scale(400));
                this._sprites.add(this._currentScoreBorder);
            }
            this._sprites.add(this._currentScoreBackground);
            this._sprites.add(this._currentScoreText);
            this._sprites.add(this._highScoreBackground);
            this._sprites.add(this._highScoreBorder);
            this._sprites.add(this._highScoreText);
            this._sprites.add(scoreCrownBackground);
            this._sprites.add(this._scoreFlare);
            this._sprites.add(this._scoreGlow);
            this._sprites.add(scoreCrown);
            this._sprites.scale.setTo(.5, .5);
            if (Game.orientation === "landscape") {
                this._sprites.y = this._offset.y - this._sprites.height / 2 - Game.scale(130);
            }
            else {
                this._sprites.y = Game.scale(80);
            }
            this.updateScoreText();
            var increasingAlpha = true;
            Game.state.onUpdate(function () {
                _this._scoreFlare.rotation += 0.0002 * Game.game.time.elapsed;
                _this._scoreGlow.alpha = Math.max(0, Math.min(1, _this._scoreGlow.alpha + (0.001 * Game.game.time.elapsed) * (increasingAlpha ? 1 : -1)));
                if (_this._scoreGlow.alpha == 1) {
                    increasingAlpha = false;
                }
                else if (_this._scoreGlow.alpha == 0) {
                    increasingAlpha = true;
                }
            });
        };
        return Score;
    })();
    ui.Score = Score;
})(ui || (ui = {}));
var util;
(function (util) {
    var Analytics = (function () {
        function Analytics(gaKey, flurryKey) {
            this._gaEnabled = false;
            this._flurryEnabled = false;
            if (DEBUG_ENABLED)
                return; // Don't enable analytics in debug mode
            if (window.location.hostname == "localhost")
                return; // Don't enable analytics on localhost
            if (gaKey != undefined && typeof ga != "undefined") {
                this._gaEnabled = true;
                ga("create", gaKey, "auto");
            }
            if (flurryKey != undefined && typeof FlurryAgent != "undefined") {
                this._flurryEnabled = true;
                FlurryAgent.startSession(flurryKey);
            }
        }
        Analytics.prototype.pageview = function (page) {
            if (this._gaEnabled) {
                ga("send", "pageview", page);
            }
            if (this._flurryEnabled) {
                FlurryAgent.logEvent("Pageview - " + page);
            }
        };
        Analytics.prototype.event = function (category, action, label, value) {
            if (this._gaEnabled) {
                // value needs to be an int so we round it
                value = value ? Math.round(value) : null;
                ga("send", "event", category, action, label, value);
            }
            if (this._flurryEnabled) {
                FlurryAgent.logEvent(category + " - " + action + " - " + label, {
                    value: value ? value.toString() : undefined
                });
            }
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
    var Debug = (function () {
        function Debug() {
        }
        Debug.calcAvgFPS = function () {
            if (Game.game.time.fps !== null) {
                // Average FPS is over the last 100 measurements
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
            // Only track FPS 10 times per state, except for GameState
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
    var DraggableGroup = (function (_super) {
        __extends(DraggableGroup, _super);
        function DraggableGroup(game, displayObject, name, addToStage, enableBody, physicsBodyType) {
            _super.call(this, game, displayObject, name, addToStage, enableBody, physicsBodyType);
            this.dragContext = null;
            this.dragSprite = null;
            this.dragSprite = util.Sprite.createSprite(this.width, this.height);
            this.dragSprite.inputEnabled = true;
            this.dragSprite.input.enableDrag(false);
            this.dragSprite.input.priorityID = 2;
            Game.game.add.existing(this.dragSprite);
        }
        DraggableGroup.prototype.cleanDestroy = function () {
            this.dragSprite.events.onDragStart.removeAll();
            this.dragSprite.events.onDragStop.removeAll();
            this.dragSprite.destroy();
            this.destroy();
        };
        DraggableGroup.prototype.recalculateDragSprite = function () {
            this.dragSprite.width = this.width;
            this.dragSprite.height = this.height;
        };
        DraggableGroup.prototype.add = function (child, silent) {
            var ret = _super.prototype.add.call(this, child, silent);
            this.recalculateDragSprite();
            return ret;
        };
        DraggableGroup.prototype.addDragStart = function (value) {
            this.dragSprite.events.onDragStart.add(value, this.dragContext || this);
        };
        DraggableGroup.prototype.addDragStop = function (value) {
            this.dragSprite.events.onDragStop.add(value, this.dragContext || this);
        };
        return DraggableGroup;
    })(Phaser.Group);
    util.DraggableGroup = DraggableGroup;
})(util || (util = {}));
var util;
(function (util) {
    var PlayTest = (function () {
        function PlayTest(key) {
            this.enabled = false;
            if (!PLAYTEST_ENABLED)
                return;
            if (key == undefined)
                return;
            this._logger = new Playtest.Logger(key, ["error", "feedback", "screenshot"]);
            this.enabled = true;
        }
        PlayTest.prototype.screenshot = function () {
            if (!this.enabled)
                return;
            this._logger.fireEventData("screenshot");
        };
        PlayTest.prototype.feedback = function () {
            if (!this.enabled)
                return;
            this._logger.fireEventData("feedback");
        };
        return PlayTest;
    })();
    util.PlayTest = PlayTest;
})(util || (util = {}));
var util;
(function (util) {
    var Save = (function () {
        function Save() {
            this._data = {};
            this._data = JSON.parse(localStorage.getItem(Game.themeData["gameId"])) || {};
            if (Object.keys(this._data).length == 0) {
                this._data["dateCreated"] = Date.now();
            }
        }
        Save.prototype.load = function (key) {
            return this._data[key];
        };
        Save.prototype.save = function (key, value) {
            this._data[key] = value;
            this._data["dateModified"] = Date.now();
            localStorage.setItem(Game.themeData["gameId"], JSON.stringify(this._data));
        };
        return Save;
    })();
    util.Save = Save;
})(util || (util = {}));
/**
 * Disable localStorage if it isn't supported, so we don't get fatal errors
 * This happens in safari private mode for example
*/
if (typeof localStorage === "object") {
    try {
        localStorage.setItem("localStorageSupported", "true");
        localStorage.removeItem("localStorageSupported");
    }
    catch (e) {
        Storage.prototype.setItem = function () { };
        Storage.prototype.getItem = function () { return false; };
    }
}
var util;
(function (util) {
    var Sound = (function () {
        function Sound() {
        }
        Sound.playFx = function (id) {
            if (Sound.muted)
                return;
            if (Sound._sounds[id] == undefined) {
                Sound._sounds[id] = Game.game.add.audio(id);
            }
            Sound._sounds[id].play();
        };
        Sound.playMusic = function (id) {
            // @TODO: What if we want to start music while muted, and then hear it as soon as we unmute?
            if (Sound.muted)
                return;
            if (Sound._musics[id] == undefined) {
                Sound._musics[id] = Game.game.add.audio(id, 1, true);
            }
            Sound._musics[id].play();
        };
        Sound.mute = function () {
            Sound.muted = true;
            Game.game.sound.pauseAll();
            Game.save.save("muted", true);
        };
        Sound.unMute = function () {
            Sound.muted = false;
            Game.game.sound.resumeAll();
            Game.save.save("muted", false);
        };
        Sound.muted = false;
        Sound._musics = {};
        Sound._sounds = {};
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
        /**
         * Creates a bitmap with specified dimensions and color
         *
         * @param   {number}          width
         * @param   {number}          height
         * @param   {util.IRGBColor}  color
         *
         * @return  {Phaser.BitmapData}
         */
        Sprite.createBitmapData = function (width, height, color) {
            if (color === void 0) { color = undefined; }
            var bitmapData = Game.game.make.bitmapData(width, height);
            if (color != undefined) {
                bitmapData.fill(color.r, color.g, color.b);
            }
            return bitmapData;
        };
        /**
         * Creates a sprite with specified dimensions and color
         *
         * @param   {number}          width
         * @param   {number}          height
         * @param   {util.IRGBColor}  color
         *
         * @return  {Phaser.Sprite}
         */
        Sprite.createSprite = function (width, height, color) {
            if (color === void 0) { color = undefined; }
            var bmd = Sprite.createBitmapData(width, height, color);
            return new Phaser.Sprite(Game.game, 0, 0, bmd);
        };
        /**
         * Creates a colored bitmap that is alpha-masked by the provided mask
         *
         * @param   {Phaser.Image|Phaser.BitmapData}  mask
         * @param   {util.IRGBColor}                  color
         *
         * @return  {Phaser.BitmapData}
         */
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
