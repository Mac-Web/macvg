var TProject;
(function (TProject) {
    var GameEvent = (function () {
        function GameEvent() {
        }
        GameEvent.fieldChanged = new Phaser.Signal();
        GameEvent.linesCleared = new Phaser.Signal();
        GameEvent.restartNeeded = new Phaser.Signal();
        GameEvent.moveDone = new Phaser.Signal();
        GameEvent.newAchieveRequest = new Phaser.Signal();
        GameEvent.achieveUnlocked = new Phaser.Signal();
        GameEvent.continueSignal = new Phaser.Signal();
        GameEvent.achieveSignal = new Phaser.Signal();
        GameEvent.onScoreChange = new Phaser.Signal();
        GameEvent.onPause = new Phaser.Signal();
        GameEvent.onStateChange = new Phaser.Signal();
        GameEvent.onMusicChange = new Phaser.Signal();
        GameEvent.onSfxChange = new Phaser.Signal();
        GameEvent.onMonthChange = new Phaser.Signal();
        GameEvent.onMonthArrowPress = new Phaser.Signal();
        GameEvent.onDayButtonPress = new Phaser.Signal();
        GameEvent.onPopUpButtonPress = new Phaser.Signal();
        GameEvent.UIButtonPress = new Phaser.Signal();
        GameEvent.secondPass = new Phaser.Signal();
        GameEvent.saveDay = new Phaser.Signal();
        GameEvent.onHintUsed = new Phaser.Signal();
        GameEvent.levelPassed = new Phaser.Signal();
        GameEvent.tutorialProcess = new Phaser.Signal();
        return GameEvent;
    }());
    TProject.GameEvent = GameEvent;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var Achieve = (function (_super) {
        __extends(Achieve, _super);
        function Achieve(game, x, y, id, type, subid) {
            var _this = _super.call(this, game, x, y) || this;
            _this._opened = false;
            _this._achieveValue = 120;
            _this._type = type;
            _this._id = id;
            _this._subid = subid;
            _this._achieveValue = TProject.Boot.gameConfig["achievementReward"];
            _this._back = _this.game.make.sprite(0, 0, "gameAssets", "achieveBack");
            _this._back.alpha = 0.1;
            _this._icon = _this.game.make.sprite(50, _this._back.height / 2, "gameAssets", "achievmentIcon");
            _this._icon.anchor.set(0.5, 0.5);
            _this._coinIcon = _this.game.make.sprite(_this._back.width / 2 - 120, _this._back.height / 2, "gameAssets", "coin");
            _this.initTexts();
            _this._newText.anchor.set(0.5, 0.5);
            _this._newText.rotation = -8 / 180 * Math.PI;
            _this.addChild(_this._back);
            _this.addChild(_this._icon);
            _this.addChild(_this._coinIcon);
            _this.addChild(_this._coinText);
            _this.addChild(_this._title);
            _this.addChild(_this._newText);
            _this._newText.visible = false;
            _this.initAchievement(_this.game.renderer.type == Phaser.CANVAS);
            TProject.GameEvent.achieveSignal.add(_this.checkAchieve, _this);
            return _this;
        }
        Object.defineProperty(Achieve.prototype, "id", {
            get: function () { return this._id; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Achieve.prototype, "titleText", {
            get: function () { return this._title.text; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Achieve.prototype, "titleFrameName", {
            get: function () { return this._titleFrameName; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Achieve.prototype, "coinText", {
            get: function () { return this._coinText.text; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Achieve.prototype, "isOpened", {
            get: function () { return this._opened; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Achieve.prototype, "iconFrameName", {
            get: function () { return this._icon.frameName; },
            enumerable: true,
            configurable: true
        });
        Achieve.prototype.initTexts = function () {
            if (!(this.game.renderer.type == Phaser.CANVAS)) {
                var frameKeyString = "";
                switch (this._type) {
                    case TProject.AchieveManager.MEDAL:
                        frameKeyString = "medal";
                        break;
                    case TProject.AchieveManager.TOTALLINES:
                        frameKeyString = "clearLine";
                        break;
                    case TProject.AchieveManager.LINESATONCE:
                        frameKeyString = "linesAtOnce";
                        break;
                    case TProject.AchieveManager.LINESINROW:
                        frameKeyString = "linesAtRow";
                        break;
                    case TProject.AchieveManager.CYANCOUNT:
                        frameKeyString = "0";
                        break;
                    case TProject.AchieveManager.PINKCOUNT:
                        frameKeyString = "1";
                        break;
                    case TProject.AchieveManager.REDCOUNT:
                        frameKeyString = "2";
                        break;
                    case TProject.AchieveManager.ORANGECOUNT:
                        frameKeyString = "3";
                        break;
                    case TProject.AchieveManager.YELLOWCOUNT:
                        frameKeyString = "4";
                        break;
                    case TProject.AchieveManager.ICECOUNT:
                        frameKeyString = "5";
                        break;
                    case TProject.AchieveManager.GREENCOUNT:
                        frameKeyString = "6";
                        break;
                    case TProject.AchieveManager.BLUECOUNT:
                        frameKeyString = "7";
                        break;
                    case TProject.AchieveManager.VIOLETCOUNT:
                        frameKeyString = "8";
                        break;
                    case TProject.AchieveManager.PURPLECOUNT:
                        frameKeyString = "9";
                        break;
                    case TProject.AchieveManager.TOTALCOINS:
                        frameKeyString = "coinsCollect";
                        break;
                    case TProject.AchieveManager.CONTINUEDGAMES:
                        frameKeyString = "continuedGames";
                        break;
                }
                this._titleFrameName = frameKeyString + this._subid;
                //console.log("sprited!");
                this._title = this.game.make.sprite(this._coinIcon.x, 5, "menuTextAtlas", frameKeyString + this._subid);
                this._title.tint = "#000000";
                this._coinText = this.game.make.sprite(this._coinIcon.x + this._coinIcon.width + 5, this._coinIcon.y, "menuTextAtlas", "achieveReward");
                this._newText = this.game.make.sprite(this._icon.x + 30, this._icon.y - 30, "menuTextAtlas", "newText");
            }
            else {
                this._title = this.game.make.text(this._coinIcon.x, 5, "Achievement title", {
                    font: "24px " + TProject.Boot.fontName,
                    fill: "#000000"
                });
                this._coinText = this.game.make.text(this._coinIcon.x + this._coinIcon.width + 5, this._coinIcon.y, this._achieveValue + "", {
                    font: "24px " + TProject.Boot.fontName,
                    fill: "#000000"
                });
                this._newText = this.game.make.text(this._icon.x + 30, this._icon.y - 30, "new!", {
                    font: "24px " + TProject.Boot.fontName,
                    fill: "#f57f17",
                    stroke: "#ffeb3b",
                    strokeThickness: 2
                });
            }
        };
        Achieve.prototype.setAsNew = function () {
            this._newText.scale.set(1, 1);
            this.game.add.tween(this._newText.scale).to({ x: 0.9, y: 0.9 }, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
            this._newText.visible = true;
        };
        Achieve.prototype.unsetAsNew = function () {
            this.game.tweens.removeFrom(this._newText.scale);
            this._newText.visible = false;
        };
        Achieve.prototype.openIt = function (really) {
            if (really === void 0) { really = false; }
            if (really) {
                console.log("kek");
                this._opened = true;
                this._icon.alpha = 1;
                this._coinText.alpha = 1;
                this._coinIcon.alpha = 1;
                this._title.alpha = 1;
                TProject.Boot.addMoney(this._achieveValue);
                TProject.GameEvent.achieveSignal.remove(this.checkAchieve, this);
                TProject.Boot.achieveManager.addAchieveToShow(this._id);
            }
        };
        Achieve.prototype.checkAchieve = function () {
            if (this._opened) {
                TProject.GameEvent.achieveSignal.remove(this.checkAchieve, this);
                return;
            }
            //console.log("achieve checked");
            switch (this._type) {
                case TProject.AchieveManager.MEDAL:
                    this.openIt(TProject.Boot.gameConfig["medalsAchievesCount"][this._subid] <= TProject.Boot.highScorePoints);
                    break;
                case TProject.AchieveManager.TOTALLINES:
                    this.openIt(TProject.Boot.gameConfig["clearLinesAchieve"][this._subid] <= TProject.Boot.totalLinesRemoved);
                    break;
                case TProject.AchieveManager.LINESATONCE:
                    this.openIt(TProject.Boot.gameConfig["linesAtOnceAchieve"][this._subid] <= TProject.Boot.removedLinesAtOnce);
                    break;
                case TProject.AchieveManager.LINESINROW:
                    this.openIt(TProject.Boot.gameConfig["linesAtRowAchieve"][this._subid] <= TProject.Boot.removedLinesAtRow);
                    break;
                case TProject.AchieveManager.CYANCOUNT:
                    this.openIt(TProject.Boot.gameConfig["colorAchieve"][this._subid] <= TProject.Boot.cyanBlocksDestroyed);
                    break;
                case TProject.AchieveManager.PINKCOUNT:
                    this.openIt(TProject.Boot.gameConfig["colorAchieve"][this._subid] <= TProject.Boot.pinkBlocksDestroyed);
                    break;
                case TProject.AchieveManager.REDCOUNT:
                    this.openIt(TProject.Boot.gameConfig["colorAchieve"][this._subid] <= TProject.Boot.redBlocksDestroyed);
                    break;
                case TProject.AchieveManager.ORANGECOUNT:
                    this.openIt(TProject.Boot.gameConfig["colorAchieve"][this._subid] <= TProject.Boot.orangeBlocksDestroyed);
                    break;
                case TProject.AchieveManager.YELLOWCOUNT:
                    this.openIt(TProject.Boot.gameConfig["colorAchieve"][this._subid] <= TProject.Boot.yellowBlocksDestroyed);
                    break;
                case TProject.AchieveManager.ICECOUNT:
                    this.openIt(TProject.Boot.gameConfig["colorAchieve"][this._subid] <= TProject.Boot.iceBlocksDestroyed);
                    break;
                case TProject.AchieveManager.GREENCOUNT:
                    this.openIt(TProject.Boot.gameConfig["colorAchieve"][this._subid] <= TProject.Boot.greenBlocksDestroyed);
                    break;
                case TProject.AchieveManager.BLUECOUNT:
                    this.openIt(TProject.Boot.gameConfig["colorAchieve"][this._subid] <= TProject.Boot.blueBlocksDestroyed);
                    break;
                case TProject.AchieveManager.VIOLETCOUNT:
                    this.openIt(TProject.Boot.gameConfig["colorAchieve"][this._subid] <= TProject.Boot.violetBlocksDestroyed);
                    break;
                case TProject.AchieveManager.PURPLECOUNT:
                    this.openIt(TProject.Boot.gameConfig["colorAchieve"][this._subid] <= TProject.Boot.purpleBlocksDestroyed);
                    break;
                case TProject.AchieveManager.TOTALCOINS:
                    this.openIt(TProject.Boot.gameConfig["coinsCollectAchieve"][this._subid] <= TProject.Boot.moneyTotal);
                    break;
                case TProject.AchieveManager.CONTINUEDGAMES:
                    this.openIt(TProject.Boot.gameConfig["continueGameAchieve"][this._subid] <= TProject.Boot.totalContinuedGames);
                    break;
            }
        };
        Achieve.prototype.initState = function (opened) {
            if (opened === void 0) { opened = true; }
            if (!opened) {
                this._icon.alpha = 0.5;
                this._coinText.alpha = 0.5;
                this._coinIcon.alpha = 0.5;
                this._title.alpha = 0.5;
            }
            this._opened = opened;
            TProject.GameEvent.achieveSignal.remove(this.checkAchieve, this);
        };
        Achieve.prototype.initAchievement = function (isCanvas) {
            switch (this._type) {
                case TProject.AchieveManager.MEDAL:
                    this._title.text = "Earn the " + TProject.Boot.langConfig["medalNames"][this._subid] + " medal";
                    switch (this._subid) {
                        case 0:
                            this._icon.frameName = "bronze";
                            break;
                        case 1:
                            this._icon.frameName = "silver";
                            break;
                        case 2:
                            this._icon.frameName = "gold";
                            break;
                        case 3:
                            this._icon.frameName = "platin";
                            break;
                        case 4:
                            this._icon.frameName = "diamond";
                            break;
                        case 5:
                            this._icon.frameName = "champion";
                            break;
                        case 6:
                            this._icon.frameName = "grandchampion";
                            break;
                        default:
                            this._icon.frameName = "bronze";
                            break;
                    }
                    this.initState(TProject.Boot.gameConfig["medalsAchievesCount"][this._subid] <= TProject.Boot.highScorePoints);
                    break;
                case TProject.AchieveManager.TOTALLINES:
                    if (isCanvas) {
                        this._title.text = "Clear " + TProject.Boot.gameConfig["clearLinesAchieve"][this._subid] + " lines";
                    }
                    this.initState(TProject.Boot.gameConfig["clearLinesAchieve"][this._subid] <= TProject.Boot.totalLinesRemoved);
                    break;
                case TProject.AchieveManager.LINESATONCE:
                    if (isCanvas) {
                        this._title.text = "Clear " + TProject.Boot.gameConfig["linesAtOnceAchieve"][this._subid] + " lines at once";
                    }
                    this.initState(TProject.Boot.gameConfig["linesAtOnceAchieve"][this._subid] <= TProject.Boot.removedLinesAtOnce);
                    break;
                case TProject.AchieveManager.LINESINROW:
                    if (isCanvas) {
                        this._title.text = "Clear " + TProject.Boot.gameConfig["linesAtRowAchieve"][this._subid] + " lines in row";
                    }
                    this.initState(TProject.Boot.gameConfig["linesAtRowAchieve"][this._subid] <= TProject.Boot.removedLinesAtRow);
                    break;
                case TProject.AchieveManager.CYANCOUNT:
                    if (isCanvas) {
                        this._title.text = "Clear " + TProject.Boot.gameConfig["colorAchieve"][this._subid] + " cyan blocks";
                    }
                    this.initState(TProject.Boot.gameConfig["colorAchieve"][this._subid] <= TProject.Boot.cyanBlocksDestroyed);
                    break;
                case TProject.AchieveManager.PINKCOUNT:
                    if (isCanvas) {
                        this._title.text = "Clear " + TProject.Boot.gameConfig["colorAchieve"][this._subid] + " pink blocks";
                    }
                    this.initState(TProject.Boot.gameConfig["colorAchieve"][this._subid] <= TProject.Boot.pinkBlocksDestroyed);
                    break;
                case TProject.AchieveManager.REDCOUNT:
                    if (isCanvas) {
                        this._title.text = "Clear " + TProject.Boot.gameConfig["colorAchieve"][this._subid] + " red blocks";
                    }
                    this.initState(TProject.Boot.gameConfig["colorAchieve"][this._subid] <= TProject.Boot.redBlocksDestroyed);
                    break;
                case TProject.AchieveManager.ORANGECOUNT:
                    if (isCanvas) {
                        this._title.text = "Clear " + TProject.Boot.gameConfig["colorAchieve"][this._subid] + " orange blocks";
                    }
                    this.initState(TProject.Boot.gameConfig["colorAchieve"][this._subid] <= TProject.Boot.orangeBlocksDestroyed);
                    break;
                case TProject.AchieveManager.YELLOWCOUNT:
                    if (isCanvas) {
                        this._title.text = "Clear " + TProject.Boot.gameConfig["colorAchieve"][this._subid] + " yellow blocks";
                    }
                    this.initState(TProject.Boot.gameConfig["colorAchieve"][this._subid] <= TProject.Boot.yellowBlocksDestroyed);
                    break;
                case TProject.AchieveManager.ICECOUNT:
                    if (isCanvas) {
                        this._title.text = "Clear " + TProject.Boot.gameConfig["colorAchieve"][this._subid] + " ice blocks";
                    }
                    this.initState(TProject.Boot.gameConfig["colorAchieve"][this._subid] <= TProject.Boot.iceBlocksDestroyed);
                    break;
                case TProject.AchieveManager.GREENCOUNT:
                    if (isCanvas) {
                        this._title.text = "Clear " + TProject.Boot.gameConfig["colorAchieve"][this._subid] + " green blocks";
                    }
                    this.initState(TProject.Boot.gameConfig["colorAchieve"][this._subid] <= TProject.Boot.greenBlocksDestroyed);
                    break;
                case TProject.AchieveManager.BLUECOUNT:
                    if (isCanvas) {
                        this._title.text = "Clear " + TProject.Boot.gameConfig["colorAchieve"][this._subid] + " blue blocks";
                    }
                    this.initState(TProject.Boot.gameConfig["colorAchieve"][this._subid] <= TProject.Boot.blueBlocksDestroyed);
                    break;
                case TProject.AchieveManager.VIOLETCOUNT:
                    if (isCanvas) {
                        this._title.text = "Clear " + TProject.Boot.gameConfig["colorAchieve"][this._subid] + " violet blocks";
                    }
                    this.initState(TProject.Boot.gameConfig["colorAchieve"][this._subid] <= TProject.Boot.violetBlocksDestroyed);
                    break;
                case TProject.AchieveManager.PURPLECOUNT:
                    if (isCanvas) {
                        this._title.text = "Clear " + TProject.Boot.gameConfig["colorAchieve"][this._subid] + " purple blocks";
                    }
                    this.initState(TProject.Boot.gameConfig["colorAchieve"][this._subid] <= TProject.Boot.purpleBlocksDestroyed);
                    break;
                case TProject.AchieveManager.TOTALCOINS:
                    if (isCanvas) {
                        this._title.text = "Earn " + TProject.Boot.gameConfig["coinsCollectAchieve"][this._subid] + " coins";
                    }
                    this.initState(TProject.Boot.gameConfig["coinsCollectAchieve"][this._subid] <= TProject.Boot.moneyTotal);
                    break;
                case TProject.AchieveManager.CONTINUEDGAMES:
                    if (isCanvas) {
                        this._title.text = "Continue the game " + TProject.Boot.gameConfig["continueGameAchieve"][this._subid] + " times";
                    }
                    this.initState(TProject.Boot.gameConfig["continueGameAchieve"][this._subid] <= TProject.Boot.totalContinuedGames);
                    break;
            }
        };
        Achieve.prototype.setBackAlpha = function (a) {
            this._back.alpha = a;
        };
        return Achieve;
    }(Phaser.Sprite));
    TProject.Achieve = Achieve;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var AchieveManager = (function () {
        function AchieveManager(game) {
            this._game = game;
            this._achieveGroup = this._game.make.group();
            this._achievemntsArray = [];
            this._achievemntArrayVisual = [];
            this._upcomingAchievesArray = [];
            this.initAchieves();
            TProject.GameEvent.newAchieveRequest.add(this.newAchieveShow, this);
        }
        Object.defineProperty(AchieveManager.prototype, "achieveGroup", {
            get: function () { return this._achieveGroup; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AchieveManager.prototype, "achievesCount", {
            get: function () { return this._achievemntsArray.length; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AchieveManager.prototype, "newAchievesCount", {
            get: function () { return this._upcomingAchievesArray.length; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AchieveManager.prototype, "openedCount", {
            get: function () {
                var count = 0;
                for (var i = 0; i < this._achievemntsArray.length; i++) {
                    if (this._achievemntsArray[i].isOpened) {
                        count++;
                    }
                }
                return count;
            },
            enumerable: true,
            configurable: true
        });
        AchieveManager.prototype.initAchieves = function () {
            var someAchieve;
            var n = 0;
            for (var i = 0; i < TProject.Boot.gameConfig["medalsAchievesCount"].length; i++) {
                someAchieve = new TProject.Achieve(this._game, 0, n * 100, n, AchieveManager.MEDAL, i);
                someAchieve.setBackAlpha(0.1 * (n % 2));
                n++;
                this._achievemntsArray.push(someAchieve);
                this._achieveGroup.add(someAchieve);
            }
            for (var i = 0; i < TProject.Boot.gameConfig["clearLinesAchieve"].length; i++) {
                someAchieve = new TProject.Achieve(this._game, 0, n * 100, n, AchieveManager.TOTALLINES, i);
                someAchieve.setBackAlpha(0.1 * (n % 2));
                n++;
                this._achievemntsArray.push(someAchieve);
                this._achieveGroup.add(someAchieve);
            }
            for (var i = 0; i < TProject.Boot.gameConfig["linesAtOnceAchieve"].length; i++) {
                someAchieve = new TProject.Achieve(this._game, 0, n * 100, n, AchieveManager.LINESATONCE, i);
                someAchieve.setBackAlpha(0.1 * (n % 2));
                n++;
                this._achievemntsArray.push(someAchieve);
                this._achieveGroup.add(someAchieve);
            }
            for (var i = 0; i < TProject.Boot.gameConfig["linesAtRowAchieve"].length; i++) {
                someAchieve = new TProject.Achieve(this._game, 0, n * 100, n, AchieveManager.LINESINROW, i);
                someAchieve.setBackAlpha(0.1 * (n % 2));
                n++;
                this._achievemntsArray.push(someAchieve);
                this._achieveGroup.add(someAchieve);
            }
            for (var i = 0; i < TProject.Boot.gameConfig["colorAchieve"].length; i++) {
                for (var k = 0; k < AchieveManager.COLORSARRAY.length; k++) {
                    someAchieve = new TProject.Achieve(this._game, 0, n * 100, n, AchieveManager.COLORSARRAY[k], i);
                    someAchieve.setBackAlpha(0.1 * (n % 2));
                    n++;
                    this._achievemntsArray.push(someAchieve);
                    this._achieveGroup.add(someAchieve);
                }
            }
            for (var i = 0; i < TProject.Boot.gameConfig["coinsCollectAchieve"].length; i++) {
                someAchieve = new TProject.Achieve(this._game, 0, n * 100, n, AchieveManager.TOTALCOINS, i);
                someAchieve.setBackAlpha(0.1 * (n % 2));
                n++;
                this._achievemntsArray.push(someAchieve);
                this._achieveGroup.add(someAchieve);
            }
            for (var i = 0; i < TProject.Boot.gameConfig["continueGameAchieve"].length; i++) {
                someAchieve = new TProject.Achieve(this._game, 0, n * 100, n, AchieveManager.CONTINUEDGAMES, i);
                someAchieve.setBackAlpha(0.1 * (n % 2));
                n++;
                this._achievemntsArray.push(someAchieve);
                this._achieveGroup.add(someAchieve);
            }
            this._achievemntArrayVisual = this._achievemntsArray.slice();
        };
        AchieveManager.prototype.addAchieveToShow = function (id) {
            this._achievemntArrayVisual.sort(function (x, y) { return x.id == id ? -1 : y.id == id ? 1 : 0; });
            this._upcomingAchievesArray.push(id);
            this.getAchieveById(id).setAsNew();
            this.updateAchieveGroup();
            TProject.GameEvent.achieveUnlocked.dispatch(id);
        };
        AchieveManager.prototype.getAchieveById = function (id) {
            var retAchieve;
            for (var i = 0; i < this._achievemntsArray.length; i++) {
                if (this._achievemntsArray[i].id == id) {
                    retAchieve = this._achievemntsArray[i];
                    break;
                }
            }
            return retAchieve;
        };
        AchieveManager.prototype.clearNewAchieves = function () {
            this._achievemntArrayVisual = this._achievemntsArray.slice();
            for (var i = 0; i < this._upcomingAchievesArray.length; i++) {
                this._achievemntArrayVisual[i].unsetAsNew();
            }
            this._upcomingAchievesArray = [];
            this.updateAchieveGroup();
        };
        AchieveManager.prototype.updateAchieveGroup = function () {
            for (var i = 0; i < this._achievemntArrayVisual.length; i++) {
                this._achievemntArrayVisual[i].y = i * 100;
                this._achievemntArrayVisual[i].setBackAlpha(0.07 * (i % 2));
            }
        };
        AchieveManager.prototype.updateAchievesVisibleArea = function (initPosY) {
            var invisible = 0;
            for (var i = 0; i < this._achievemntArrayVisual.length; i++) {
                if (this.achieveGroup.y + this._achievemntArrayVisual[i].y >= initPosY - 100 && this.achieveGroup.y + this._achievemntArrayVisual[i].y <= initPosY + 300) {
                    this._achieveGroup.add(this._achievemntArrayVisual[i]);
                    this._achievemntArrayVisual[i].visible = true;
                }
                else {
                    invisible++;
                    if (this._achievemntArrayVisual[i].parent != null) {
                        this._achieveGroup.remove(this._achievemntArrayVisual[i]);
                    }
                    this._achievemntArrayVisual[i].visible = false;
                }
            }
        };
        AchieveManager.prototype.newAchieveShow = function () {
        };
        AchieveManager.MEDAL = 0;
        AchieveManager.TOTALLINES = 1;
        AchieveManager.LINESATONCE = 2;
        AchieveManager.LINESINROW = 3;
        AchieveManager.CYANCOUNT = 4;
        AchieveManager.PINKCOUNT = 5;
        AchieveManager.REDCOUNT = 6;
        AchieveManager.ORANGECOUNT = 7;
        AchieveManager.YELLOWCOUNT = 8;
        AchieveManager.ICECOUNT = 9;
        AchieveManager.GREENCOUNT = 10;
        AchieveManager.BLUECOUNT = 11;
        AchieveManager.VIOLETCOUNT = 12;
        AchieveManager.PURPLECOUNT = 13;
        AchieveManager.TOTALCOINS = 14;
        AchieveManager.CONTINUEDGAMES = 15;
        AchieveManager.COLORSARRAY = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        return AchieveManager;
    }());
    TProject.AchieveManager = AchieveManager;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var GameBlock = (function (_super) {
        __extends(GameBlock, _super);
        function GameBlock(game, x, y) {
            var _this = _super.call(this, game, x, y, "gameAssets", "emptySprite") || this;
            _this._blockMap = [[true, true, true], [false, true, false], [true, true, true]];
            _this._blockColor = TProject.FieldBlock.GREEN;
            _this._blockScore = 1;
            _this._randWeight = 1;
            _this._blocksArray = [];
            _this.scaleDown(false);
            _this._blockBack = _this.game.make.sprite(0, 0, "gameAssets", "bigSquareBottom");
            _this._blockBack.scale.set(2);
            _this._blockBack.anchor.set(0.5, 0.5);
            _this._blockBack.alpha = 0;
            _this.addChild(_this._blockBack);
            return _this;
        }
        Object.defineProperty(GameBlock.prototype, "blockWidth", {
            get: function () { return this._blockMap[0].length; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameBlock.prototype, "blockHeight", {
            get: function () { return this._blockMap.length; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameBlock.prototype, "blockMap", {
            get: function () { return this._blockMap; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(GameBlock.prototype, "blockColor", {
            get: function () { return this._blockColor; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameBlock.prototype, "blockScore", {
            get: function () { return this._blockScore; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameBlock.prototype, "isItStone", {
            get: function () { return this._stoned; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameBlock.prototype, "randomWeight", {
            get: function () { return this._randWeight; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameBlock.prototype, "halfWidth", {
            get: function () {
                return (this.blockWidth * 50 / 2) + ((this.blockWidth / 2) * TProject.Boot.gameConfig["blockOffset"]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameBlock.prototype, "halfHeight", {
            get: function () {
                return (this.blockHeight * 50 / 2) + ((this.blockHeight / 2) * TProject.Boot.gameConfig["blockOffset"]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameBlock.prototype, "topLeftSprite", {
            get: function () {
                return this._topLeftSprite;
            },
            enumerable: true,
            configurable: true
        });
        GameBlock.prototype.scaleDown = function (withTween) {
            if (withTween === void 0) { withTween = true; }
            this.game.tweens.removeFrom(this.scale);
            if (withTween) {
                this.game.add.tween(this.scale).to({ x: 0.5, y: 0.5 }, 150, Phaser.Easing.Sinusoidal.InOut, true);
            }
            else {
                this.scale.set(0.5, 0.5);
            }
        };
        GameBlock.prototype.scaleUp = function (withTween) {
            if (withTween === void 0) { withTween = true; }
            this.game.tweens.removeFrom(this.scale);
            if (withTween) {
                this.game.add.tween(this.scale).to({ x: 1, y: 1 }, 150, Phaser.Easing.Sinusoidal.InOut, true);
            }
            else {
                this.scale.set(1, 1);
            }
        };
        GameBlock.prototype.generateBlock = function (color) {
            if (color === void 0) { color = null; }
            if (color == null) {
                color = TProject.FieldBlock.COLOR_LIST[Math.floor(TProject.FieldBlock.COLOR_LIST.length * Math.random())];
            }
            this._blockColor = color;
            this._blocksArray = [];
            var block;
            var x;
            var y;
            var score = 0;
            for (var i = 0; i < this.blockHeight; i++) {
                for (var k = 0; k < this.blockWidth; k++) {
                    if (this._blockMap[i][k] == true) {
                        x = -(this.blockWidth * 50 / 2) - ((this.blockWidth / 2) * TProject.Boot.gameConfig["blockOffset"]) + (50 * (k)) + (TProject.Boot.gameConfig["blockOffset"] * (k));
                        y = -(this.blockHeight * 50 / 2) - ((this.blockHeight / 2) * TProject.Boot.gameConfig["blockOffset"]) + (50 * (i)) + (TProject.Boot.gameConfig["blockOffset"] * (i));
                        block = this.game.make.sprite(x, y, "gameAssets", color);
                        this.addChild(block);
                        this._blocksArray.push(block);
                        if (i == 0 && k == 0) {
                            this._topLeftSprite = block;
                        }
                        score++;
                    }
                    else if (i == 0 && k == 0) {
                        x = -(this.blockWidth * 50 / 2) - ((this.blockWidth / 2) * TProject.Boot.gameConfig["blockOffset"]) + (50 * (k)) + (TProject.Boot.gameConfig["blockOffset"] * (k));
                        y = -(this.blockHeight * 50 / 2) - ((this.blockHeight / 2) * TProject.Boot.gameConfig["blockOffset"]) + (50 * (i)) + (TProject.Boot.gameConfig["blockOffset"] * (i));
                        block = this.game.make.sprite(x, y, "gameAssets", color);
                        block.alpha = 0;
                        this.addChild(block);
                        this._topLeftSprite = block;
                    }
                }
            }
            this._blockScore = score;
            this._stoned = false;
        };
        GameBlock.prototype.stoneIt = function () {
            for (var i = 0; i < this._blocksArray.length; i++) {
                this._blocksArray[i].frameName = "grey";
            }
            this._stoned = true;
            this.inputEnabled = false;
        };
        GameBlock.prototype.unstoneIt = function () {
            for (var i = 0; i < this._blocksArray.length; i++) {
                this._blocksArray[i].frameName = this._blockColor;
            }
            this._stoned = false;
            this.inputEnabled = true;
        };
        GameBlock.prototype.destroy = function () {
            this._topLeftSprite.destroy();
            this._blockMap = null;
            this._blockColor = null;
            _super.prototype.destroy.call(this, true);
        };
        return GameBlock;
    }(Phaser.Sprite));
    TProject.GameBlock = GameBlock;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var LineFive = (function (_super) {
        __extends(LineFive, _super);
        function LineFive(game, x, y, type) {
            if (type === void 0) { type = null; }
            var _this = _super.call(this, game, x, y) || this;
            _this.generateBlockMap(type);
            _this.generateBlock();
            return _this;
        }
        LineFive.prototype.generateBlockMap = function (type) {
            var i;
            if (type == null) {
                i = Math.floor(Math.random() * 2);
            }
            else {
                i = type;
            }
            if (i == 0) {
                this._blockMap = [[true, true, true, true, true]];
            }
            else if (i == 1) {
                this._blockMap = [[true], [true], [true], [true], [true]];
            }
        };
        return LineFive;
    }(TProject.GameBlock));
    TProject.LineFive = LineFive;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var LineFour = (function (_super) {
        __extends(LineFour, _super);
        function LineFour(game, x, y, type, color) {
            if (type === void 0) { type = null; }
            if (color === void 0) { color = null; }
            var _this = _super.call(this, game, x, y) || this;
            _this.generateBlockMap(type);
            if (color) {
                _this.generateBlock(color);
            }
            else {
                _this.generateBlock();
            }
            return _this;
        }
        LineFour.prototype.generateBlockMap = function (type) {
            var i;
            if (type == null) {
                i = Math.floor(Math.random() * 2);
            }
            else {
                i = type;
            }
            if (i == 0) {
                this._blockMap = [[true, true, true, true]];
            }
            else if (i == 1) {
                this._blockMap = [[true], [true], [true], [true]];
            }
        };
        return LineFour;
    }(TProject.GameBlock));
    TProject.LineFour = LineFour;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var LineThree = (function (_super) {
        __extends(LineThree, _super);
        function LineThree(game, x, y, type) {
            if (type === void 0) { type = null; }
            var _this = _super.call(this, game, x, y) || this;
            _this.generateBlockMap(type);
            _this.generateBlock();
            return _this;
        }
        LineThree.prototype.generateBlockMap = function (type) {
            var i;
            if (type == null) {
                i = Math.floor(Math.random() * 2);
            }
            else {
                i = type;
            }
            if (i == 0) {
                this._blockMap = [[true, true, true]];
            }
            else if (i == 1) {
                this._blockMap = [[true], [true], [true]];
            }
        };
        return LineThree;
    }(TProject.GameBlock));
    TProject.LineThree = LineThree;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var LineTwo = (function (_super) {
        __extends(LineTwo, _super);
        function LineTwo(game, x, y, type, color) {
            if (type === void 0) { type = null; }
            if (color === void 0) { color = null; }
            var _this = _super.call(this, game, x, y) || this;
            _this.generateBlockMap(type);
            _this.generateBlock(color);
            return _this;
        }
        LineTwo.prototype.generateBlockMap = function (type) {
            var i;
            if (type == null) {
                i = Math.floor(Math.random() * 2);
            }
            else {
                i = type;
            }
            if (i == 0) {
                this._blockMap = [[true, true]];
            }
            else if (i == 1) {
                this._blockMap = [[true], [true]];
            }
        };
        return LineTwo;
    }(TProject.GameBlock));
    TProject.LineTwo = LineTwo;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var NookFour = (function (_super) {
        __extends(NookFour, _super);
        function NookFour(game, x, y, type) {
            if (type === void 0) { type = null; }
            var _this = _super.call(this, game, x, y) || this;
            _this.generateBlockMap(type);
            _this.generateBlock();
            return _this;
        }
        NookFour.prototype.generateBlockMap = function (type) {
            var i;
            if (type == null) {
                i = Math.floor(Math.random() * 4);
            }
            else {
                i = type;
            }
            if (i == 0) {
                this._blockMap = [[true, true, true, true], [true, false, false, false], [true, false, false, false], [true, false, false, false]];
            }
            else if (i == 1) {
                this._blockMap = [[true, true, true, true], [false, false, false, true], [false, false, false, true], [false, false, false, true]];
            }
            else if (i == 2) {
                this._blockMap = [[false, false, false, true], [false, false, false, true], [false, false, false, true], [true, true, true, true]];
            }
            else if (i == 3) {
                this._blockMap = [[true, false, false, false], [true, false, false, false], [true, false, false, false], [true, true, true, true]];
            }
        };
        return NookFour;
    }(TProject.GameBlock));
    TProject.NookFour = NookFour;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var NookThree = (function (_super) {
        __extends(NookThree, _super);
        function NookThree(game, x, y, type, color) {
            if (type === void 0) { type = null; }
            if (color === void 0) { color = null; }
            var _this = _super.call(this, game, x, y) || this;
            _this.generateBlockMap(type);
            _this.generateBlock(color);
            return _this;
        }
        NookThree.prototype.generateBlockMap = function (type) {
            var i;
            if (type == null) {
                i = Math.floor(Math.random() * 4);
            }
            else {
                i = type;
            }
            if (i == 0) {
                this._blockMap = [[true, true, true], [true, false, false], [true, false, false]];
            }
            else if (i == 1) {
                this._blockMap = [[true, true, true], [false, false, true], [false, false, true]];
            }
            else if (i == 2) {
                this._blockMap = [[true, false, false], [true, false, false], [true, true, true]];
            }
            else if (i == 3) {
                this._blockMap = [[false, false, true], [false, false, true], [true, true, true]];
            }
        };
        return NookThree;
    }(TProject.GameBlock));
    TProject.NookThree = NookThree;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var NookTwo = (function (_super) {
        __extends(NookTwo, _super);
        function NookTwo(game, x, y, type, color) {
            if (type === void 0) { type = null; }
            if (color === void 0) { color = null; }
            var _this = _super.call(this, game, x, y) || this;
            _this.generateBlockMap(type);
            _this.generateBlock(color);
            return _this;
        }
        NookTwo.prototype.generateBlockMap = function (type) {
            var i;
            if (type == null) {
                i = Math.floor(Math.random() * 4);
            }
            else {
                i = type;
            }
            if (i == 0) {
                this._blockMap = [[true, true], [true, false]];
            }
            else if (i == 1) {
                this._blockMap = [[true, true], [false, true]];
            }
            else if (i == 2) {
                this._blockMap = [[true, false], [true, true]];
            }
            else if (i == 3) {
                this._blockMap = [[false, true], [true, true]];
            }
        };
        return NookTwo;
    }(TProject.GameBlock));
    TProject.NookTwo = NookTwo;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var SimpleDot = (function (_super) {
        __extends(SimpleDot, _super);
        function SimpleDot(game, x, y) {
            var _this = _super.call(this, game, x, y) || this;
            _this._blockMap = [[true]];
            _this.generateBlock();
            return _this;
        }
        return SimpleDot;
    }(TProject.GameBlock));
    TProject.SimpleDot = SimpleDot;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var SquareThree = (function (_super) {
        __extends(SquareThree, _super);
        function SquareThree(game, x, y) {
            var _this = _super.call(this, game, x, y) || this;
            _this._blockMap = [[true, true, true], [true, true, true], [true, true, true]];
            _this.generateBlock();
            return _this;
        }
        return SquareThree;
    }(TProject.GameBlock));
    TProject.SquareThree = SquareThree;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var SquareTwo = (function (_super) {
        __extends(SquareTwo, _super);
        function SquareTwo(game, x, y, type, color) {
            if (type === void 0) { type = null; }
            if (color === void 0) { color = null; }
            var _this = _super.call(this, game, x, y) || this;
            _this._blockMap = [[true, true], [true, true]];
            _this.generateBlock(color);
            return _this;
        }
        return SquareTwo;
    }(TProject.GameBlock));
    TProject.SquareTwo = SquareTwo;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var ExplosionLineAnimation = (function (_super) {
        __extends(ExplosionLineAnimation, _super);
        function ExplosionLineAnimation(game, x, y, horizontal) {
            var _this = _super.call(this, game, x, y, "gameAssets", "emptySprite") || this;
            _this._horizontal = horizontal;
            _this._firstExplosion = _this.game.make.sprite(0, 0, "gameAssets", "animation_05");
            _this._firstExplosion.animations.add("explode", Phaser.Animation.generateFrameNames("animation_", 5, 33, "", 2), 40);
            _this._firstExplosion.anchor.set(1, 0.5);
            _this._secondExplosion = _this.game.make.sprite(0, 0, "gameAssets", "animation_05");
            _this._explosionAnimation = _this._secondExplosion.animations.add("explode", Phaser.Animation.generateFrameNames("animation_", 5, 33, "", 2), 40);
            _this._secondExplosion.anchor.set(1, 0.5);
            if (!_this._horizontal) {
                _this._firstExplosion.angle = 90;
                _this._secondExplosion.angle = 90;
            }
            _this._secondExplosion.scale.set(-1, 1);
            _this.addChild(_this._firstExplosion);
            _this.addChild(_this._secondExplosion);
            _this._explosionAnimation.onComplete.add(_this.hideExplosion, _this);
            _this.visible = false;
            return _this;
        }
        ExplosionLineAnimation.prototype.showExplosion = function () {
            this.visible = true;
            this._firstExplosion.play("explode");
            this._secondExplosion.play("explode");
        };
        ExplosionLineAnimation.prototype.hideExplosion = function () {
            this.visible = false;
        };
        return ExplosionLineAnimation;
    }(Phaser.Sprite));
    TProject.ExplosionLineAnimation = ExplosionLineAnimation;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var GameTweens = (function () {
        function GameTweens() {
        }
        GameTweens.wiggle = function (aProgress, aPeriod1, aPeriod2) {
            var current1 = aProgress * Math.PI * 2 * aPeriod1;
            var current2 = aProgress * (Math.PI * 2 * aPeriod2 + Math.PI / 2);
            return Math.sin(current1) * Math.cos(current2);
        };
        return GameTweens;
    }());
    TProject.GameTweens = GameTweens;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var Main = (function () {
        function Main() {
            this.cfg = {
                width: "100",
                height: "100",
                multiTexture: true,
                renderer: Phaser.AUTO,
                parent: 'game',
                enableDebug: true,
                antialias: true
            };

            this.game = new Phaser.Game(this.cfg);
            this.game.state.add("Boot", TProject.Boot, true);
            this.game.state.add("Preloader", TProject.Preloader);
            this.game.state.add("Level", TProject.Level);
        }
        return Main;
    }());
    TProject.Main = Main;
})(TProject || (TProject = {}));
window.onWrapperReady = function () {
    var maingame;
    setTimeout("window.scrollTo(0, 1)", 10);
    sgSdk.initialize(["basic", "scoreGame"], {
        id: "2020-plus",
        build: "0.9.6",
        supportedLanguages: ["en", "de", "es", "fr", "it", "pt", "ru", "tr", "nl", "pl", "ja"],
        freezeGame: function () {
            maingame.game.paused = true;
            maingame.game.sound.mute = true;
        },
        unfreezeGame: function () {
            maingame.game.paused = false;
            maingame.game.sound.mute = false;
        },
        getScore: function () { },
        startOver: function () { },
        runGame: function () {
            console.log("run game")
            sdkHandler.trigger("start");
            maingame.game.state.start("Level", true);
            sdkHandler.trigger("gameStart");
            console.log("game start")
        }
    }, function (err, settings, sdkHandl) {
        if (err) {
            console.log(err);
        }
        sdkHandler = sdkHandl;
        sgSettings = settings;
        console.log(settings);
        dataMigrator.migrateLocalDataToPlatform();

        mySaver.loadData().then(function() {
            maingame = new TProject.Main();
        });


    });
};

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super.call(this) || this;
        }
        Boot.prototype.init = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = false;
            this.game.stage.backgroundColor = "#B07438";
            this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
            this.firstRunLandscape = this.game.scale.isGameLandscape;
            if (!this.game.device.desktop) {
                this.game.scale.forceOrientation(false, true);
                this.game.scale.enterIncorrectOrientation.add(this.handleIncorrect, this);
                this.game.scale.leaveIncorrectOrientation.add(this.handleCorrect, this);
            }
            TProject.GameEvent.onMusicChange.add(Boot.onMusicChange, this);
            TProject.GameEvent.onSfxChange.add(Boot.onSfxChange, this);
        };
        Boot.prototype.handleIncorrect = function () {
            document.getElementById("turn").style.display = "block";
        };
        Boot.prototype.handleCorrect = function () {
            document.getElementById("turn").style.display = "none";
        };
        Boot.gameOverTrigger = function () {
            console.log("sdk event trigger");
        };
        Boot.addMoney = function (n) {
            Boot.currentMoney += n;
            Boot.moneyTotal += n;
        };
        Boot.onMusicChange = function () {
            if (Boot.music != null) {
                Boot.musicEnable = !Boot.musicEnable;
                if (Boot.musicEnable) {
                    !Boot.music.isPlaying && Boot.music.play();
                    Boot.music.resume();
                }
                else {
                    Boot.music.pause();
                }
            }
            Boot.saveTheGame();
        };
        Boot.onSfxChange = function () {
            Boot.sfxEnable = !Boot.sfxEnable;
            Boot.saveTheGame();
        };
        Boot.saveTheGame = function () {
            Boot.saveGameObject = {};
            Boot.saveGameObject["musicEnable"] = Boot.musicEnable;
            Boot.saveGameObject["sfxEnable"] = Boot.sfxEnable;
            Boot.saveGameObject["currentMoney"] = Boot.currentMoney;
            Boot.saveGameObject["totalPoints"] = Boot.totalPoints;
            Boot.saveGameObject["highScore"] = Boot.highScorePoints;
            Boot.saveGameObject["linesRemoved"] = Boot.totalLinesRemoved;
            Boot.saveGameObject["removedLinesAtOnce"] = Boot.removedLinesAtOnce;
            Boot.saveGameObject["removedLinesAtRow"] = Boot.removedLinesAtRow;
            Boot.saveGameObject["cyanBlocksDestroyed"] = Boot.cyanBlocksDestroyed;
            Boot.saveGameObject["pinkBlocksDestroyed"] = Boot.pinkBlocksDestroyed;
            Boot.saveGameObject["redBlocksDestroyed"] = Boot.redBlocksDestroyed;
            Boot.saveGameObject["orangeBlocksDestroyed"] = Boot.orangeBlocksDestroyed;
            Boot.saveGameObject["yellowBlocksDestroyed"] = Boot.yellowBlocksDestroyed;
            Boot.saveGameObject["iceBlocksDestroyed"] = Boot.iceBlocksDestroyed;
            Boot.saveGameObject["greenBlocksDestroyed"] = Boot.greenBlocksDestroyed;
            Boot.saveGameObject["blueBlocksDestroyed"] = Boot.blueBlocksDestroyed;
            Boot.saveGameObject["violetBlocksDestroyed"] = Boot.violetBlocksDestroyed;
            Boot.saveGameObject["purpleBlocksDestroyed"] = Boot.purpleBlocksDestroyed;
            Boot.saveGameObject["moneyTotal"] = Boot.moneyTotal;
            Boot.saveGameObject["totalContinuedGames"] = Boot.totalContinuedGames;

            //localStorage.setItem("gameData", JSON.stringify(Boot.saveGameObject));
            localStorage.setItem("fieldData", JSON.stringify(Boot.saveFieldObject));

            mySaver.save("saveGameObject_", Boot.saveGameObject)
            mySaver.save("saveFieldObject_", Boot.saveFieldObject)
        };
        Boot.loadTheGame = function () {
            if (/* localStorage.getItem("gameData") != null && */  localStorage.getItem("fieldData") != null) {

                Boot.saveGameObject  = mySaver.get("saveGameObject_");  //JSON.parse(localStorage.getItem("gameData"));
                Boot.saveFieldObject = JSON.parse(localStorage.getItem("fieldData"));
                Boot.musicEnable = Boot.saveGameObject["musicEnable"];
                Boot.sfxEnable = Boot.saveGameObject["sfxEnable"];
                Boot.currentMoney = Boot.saveGameObject["currentMoney"];
                Boot.totalPoints = Boot.saveGameObject["totalPoints"];
                Boot.highScorePoints = Boot.saveGameObject["highScore"];
                Boot.totalLinesRemoved = Boot.saveGameObject["linesRemoved"];
                Boot.removedLinesAtOnce = Boot.saveGameObject["removedLinesAtOnce"];
                Boot.removedLinesAtRow = Boot.saveGameObject["removedLinesAtRow"];
                Boot.cyanBlocksDestroyed = Boot.saveGameObject["cyanBlocksDestroyed"];
                Boot.pinkBlocksDestroyed = Boot.saveGameObject["pinkBlocksDestroyed"];
                Boot.redBlocksDestroyed = Boot.saveGameObject["redBlocksDestroyed"];
                Boot.orangeBlocksDestroyed = Boot.saveGameObject["orangeBlocksDestroyed"];
                Boot.yellowBlocksDestroyed = Boot.saveGameObject["yellowBlocksDestroyed"];
                Boot.iceBlocksDestroyed = Boot.saveGameObject["iceBlocksDestroyed"];
                Boot.greenBlocksDestroyed = Boot.saveGameObject["greenBlocksDestroyed"];
                Boot.blueBlocksDestroyed = Boot.saveGameObject["blueBlocksDestroyed"];
                Boot.violetBlocksDestroyed = Boot.saveGameObject["violetBlocksDestroyed"];
                Boot.purpleBlocksDestroyed = Boot.saveGameObject["purpleBlocksDestroyed"];
                Boot.moneyTotal = Boot.saveGameObject["moneyTotal"];
                Boot.totalContinuedGames = Boot.saveGameObject["totalContinuedGames"];
           }
        };
        Boot.changedString = function (valAr, str) {
            var retStr = str;
            for (var i = 1; i <= valAr.length; i++) {
                var st = "$" + i;
                retStr = retStr.split(st).join(valAr[(i - 1)] + "");
            }
            return retStr;
        };
        Boot.prototype.preload = function () {
            this.game.load.image("loadingIconGold", Boot.PATH_IMAGES + "loadingIcon1.png");
            this.game.load.image("loadingIconGrey", Boot.PATH_IMAGES + "loadingIcon1Grey.png");
            this.game.load.text("config", Boot.PATH_SETTINGS + "gameconfig.json?v=4");
        };
        Boot.prototype.create = function () {
            Boot.gameConfig = JSON.parse(this.game.cache.getText("config"));
            Boot.defLang = sgSettings.config.env.locale;
            Boot.adEnabled = Boot.gameConfig["adEnabled"];
            this.game.scale.refresh();
            this.game.state.start("Preloader");
        };
        Boot.PATH_IMAGES = "./assets/images/";
        Boot.PATH_FONTS = "./assets/fonts/";
        Boot.PATH_SOUNDS = "./assets/sounds/";
        Boot.PATH_SETTINGS = "./assets/data/";
        Boot.showTutorial = true;
        Boot.defLang = "en";
        Boot.sfxEnable = true;
        Boot.musicEnable = false;
        Boot.adEnabled = true;
        Boot.dpiScaleFactor = window.devicePixelRatio * 1.5;
        Boot.firstTimePlay = false;
        Boot.fontName = "framd";
        Boot.currentMoney = 0;
        Boot.totalPoints = 0;
        Boot.highScorePoints = 0;
        Boot.totalLinesRemoved = 0;
        Boot.removedLinesAtOnce = 0;
        Boot.removedLinesAtRow = 0;
        Boot.cyanBlocksDestroyed = 0;
        Boot.pinkBlocksDestroyed = 0;
        Boot.redBlocksDestroyed = 0;
        Boot.orangeBlocksDestroyed = 0;
        Boot.yellowBlocksDestroyed = 0;
        Boot.iceBlocksDestroyed = 0;
        Boot.greenBlocksDestroyed = 0;
        Boot.blueBlocksDestroyed = 0;
        Boot.violetBlocksDestroyed = 0;
        Boot.purpleBlocksDestroyed = 0;
        Boot.moneyTotal = 0;
        Boot.totalContinuedGames = 0;
        return Boot;
    }(Phaser.State));
    TProject.Boot = Boot;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var Level = (function (_super) {
        __extends(Level, _super);
        function Level() {
            var _this = _super.call(this) || this;
            _this._tutorialStep = 0;
            _this._boosterStep = 0;
            _this._currentBoosterType = 0;
            _this._boosterComboDelay = 0;
            _this._boosterPointsMultiplier = 1;
            _this._boosterComboMultiplier = 1;
            _this._elementsList = ["Dot", "SquareTwo", "SquareThree", "LineTwo", "LineThree", "LineFour", "LineFive", "NookTwo", "NookThree", "NookFour"];
            _this._elementsWeightList = [5, 3, 2, 5, 4, 3, 1, 4, 2, 1];
            _this._currentRank = 0;
            _this._prevSessionExist = false;
            _this._showHand = false;
            return _this;
        }
        Level.prototype.preload = function () {
            if (!(this.game.renderer.type == Phaser.CANVAS)) {
                TProject.Boot.texturesArray = this.game.renderer.setTexturePriority(["gameAssets"]);
            }
        };
        Level.prototype.create = function () {
            if (TProject.Boot.music == null) {
                TProject.Boot.music = this.game.make.sound("main_theme", 0.2, true);
                if (TProject.Boot.musicEnable) {
                    TProject.Boot.music.play();
                }
            }
            this._shotOuts = TProject.Boot.langConfig["shotOuts"];
            this._grabSound = this.game.make.sound("grab_figure");
            this._insertSound = this.game.make.sound("insert_figure");
            this._loseSound = this.game.make.sound("lose");
            this._newMedalSound = this.game.make.sound("new_medal");
            this._background = this.game.add.sprite(0, 0, "gameAssets", "bg");
            this._giftShakeTimer = this.game.time.create(false);
            this._giftShakeTimer.loop(5000, this.shakeGift, this);
            this._newAchievesIds = [];
            this._handSprite = this.game.make.sprite(0, 0, "gameAssets", "finger");
            this._handSprite.anchor.set(0, 0);
            this._prevSessionExist = false;
            this._canBeContinued = true;
            this._currentRank = 0;
            this._currScore = 0;
            this._gameScore = 0;
            if (TProject.Boot.totalPoints > 0) {
                this._prevSessionExist = true;
                this._gameScore = TProject.Boot.totalPoints;
                this._currScore = TProject.Boot.totalPoints;
            }
            if (!(this.game.renderer.type == Phaser.CANVAS)) {
                this.createTextAtlas();
            }
            TProject.Boot.achieveManager = new TProject.AchieveManager(this.game);
            this.createField();
            this.createTopUI();
            this.createBottomUI();
            this.createBlocks();
            this.createMoodUp();
            this.createBonusPopUp();
            this.createLoseScreen();
            this.createPauseScreen();
            this._comboTimer = this.game.time.create(false);
            this._comboTimer.loop(5000, this.resetCombo, this);
            this._currentCombo = 0;
            this._comboTimer.start();
            this.checkRank(this._prevSessionExist);
            if (TProject.Boot.firstTimePlay) {
                this.initiateTutorial();
            }
            TProject.GameEvent.linesCleared.add(this.checkCombo, this);
            TProject.GameEvent.restartNeeded.add(this.restartLevel, this);
            TProject.GameEvent.moveDone.add(this.updateBoosterState, this);
            TProject.GameEvent.continueSignal.add(this.checkContinue, this);
            TProject.GameEvent.achieveUnlocked.add(this.addNewAchieve, this);
            this.resize();
        };
        Level.prototype.createTextAtlas = function () {
            this._textBitmapData = this.game.make.bitmapData(2000, 2000);
            var cpx = 0;
            var cpy = 0;
            var counttxt = 1;
            var str = '{"frames":{';
            var _text;
            var curcol = "";
            for (var i = 0; i < TProject.Boot.gameConfig["medalsAchievesCount"].length; i++) {
                _text = new Phaser.Text(this.game, cpx, cpy, TProject.Boot.changedString([TProject.Boot.langConfig["medalNames"][i]], TProject.Boot.langConfig["medalAchieveText"]), {
                    font: "24px " + TProject.Boot.fontName,
                    fill: "#ffffff"
                });
                counttxt = 1;
                while (_text.width > 350) {
                    _text.fontSize = 24 - counttxt;
                    counttxt += 1;
                }
                if (window.devicePixelRatio > 1) {
                    _text.resolution = TProject.Boot.dpiScaleFactor;
                }
                str += '"medal' + i + '":{"frame":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height + '},"rotated":false,' +
                    '"trimmed":false,"spriteSourceSize":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height +
                    '},"sourceSize":{"w":' + _text.width + ',"h":' + _text.height + '}},';
                this._textBitmapData.draw(this.game.make.sprite(0, 0, _text.generateTexture()), _text.x, _text.y);
                cpx += _text.width + 1;
                if (cpx >= 1700) {
                    cpx = 0;
                    cpy += 50;
                }
            }
            for (var i = 0; i < TProject.Boot.gameConfig["clearLinesAchieve"].length; i++) {
                _text = new Phaser.Text(this.game, cpx, cpy, TProject.Boot.changedString([TProject.Boot.gameConfig["clearLinesAchieve"][i]], TProject.Boot.langConfig["clearLinesAchieveText"]), {
                    font: "24px " + TProject.Boot.fontName,
                    fill: "#ffffff"
                });
                counttxt = 1;
                while (_text.width > 350) {
                    _text.fontSize = 24 - counttxt;
                    counttxt += 1;
                }
                if (window.devicePixelRatio > 1) {
                    _text.resolution = TProject.Boot.dpiScaleFactor;
                }
                str += '"clearLine' + i + '":{"frame":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height + '},"rotated":false,' +
                    '"trimmed":false,"spriteSourceSize":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height +
                    '},"sourceSize":{"w":' + _text.width + ',"h":' + _text.height + '}},';
                this._textBitmapData.draw(this.game.make.sprite(0, 0, _text.generateTexture()), _text.x, _text.y);
                cpx += _text.width + 1;
                if (cpx >= 1700) {
                    cpx = 0;
                    cpy += 50;
                }
            }
            for (var i = 0; i < TProject.Boot.gameConfig["linesAtOnceAchieve"].length; i++) {
                _text = new Phaser.Text(this.game, cpx, cpy, TProject.Boot.changedString([TProject.Boot.gameConfig["linesAtOnceAchieve"][i]], TProject.Boot.langConfig["linesAtOnceAchieveText"]), {
                    font: "24px " + TProject.Boot.fontName,
                    fill: "#ffffff"
                });
                counttxt = 1;
                while (_text.width > 350) {
                    _text.fontSize = 24 - counttxt;
                    counttxt += 1;
                }
                if (window.devicePixelRatio > 1) {
                    _text.resolution = TProject.Boot.dpiScaleFactor;
                }
                str += '"linesAtOnce' + i + '":{"frame":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height + '},"rotated":false,' +
                    '"trimmed":false,"spriteSourceSize":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height +
                    '},"sourceSize":{"w":' + _text.width + ',"h":' + _text.height + '}},';
                this._textBitmapData.draw(this.game.make.sprite(0, 0, _text.generateTexture()), _text.x, _text.y);
                cpx += _text.width + 1;
                if (cpx >= 1700) {
                    cpx = 0;
                    cpy += 50;
                }
            }
            for (var i = 0; i < TProject.Boot.gameConfig["linesAtRowAchieve"].length; i++) {
                _text = new Phaser.Text(this.game, cpx, cpy, TProject.Boot.changedString([TProject.Boot.gameConfig["linesAtRowAchieve"][i]], TProject.Boot.langConfig["linesAtRowAchieveText"]), {
                    font: "24px " + TProject.Boot.fontName,
                    fill: "#ffffff"
                });
                counttxt = 1;
                while (_text.width > 350) {
                    _text.fontSize = 24 - counttxt;
                    counttxt += 1;
                }
                if (window.devicePixelRatio > 1) {
                    _text.resolution = TProject.Boot.dpiScaleFactor;
                }
                str += '"linesAtRow' + i + '":{"frame":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height + '},"rotated":false,' +
                    '"trimmed":false,"spriteSourceSize":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height +
                    '},"sourceSize":{"w":' + _text.width + ',"h":' + _text.height + '}},';
                this._textBitmapData.draw(this.game.make.sprite(0, 0, _text.generateTexture()), _text.x, _text.y);
                cpx += _text.width + 1;
                if (cpx >= 1700) {
                    cpx = 0;
                    cpy += 50;
                }
            }
            for (var i = 0; i < TProject.Boot.gameConfig["colorAchieve"].length; i++) {
                for (var k = 0; k < TProject.AchieveManager.COLORSARRAY.length; k++) {
                    switch (TProject.AchieveManager.COLORSARRAY[k]) {
                        case TProject.AchieveManager.CYANCOUNT:
                            curcol = TProject.Boot.langConfig["colorsNames"][0];
                            break;
                        case TProject.AchieveManager.PINKCOUNT:
                            curcol = TProject.Boot.langConfig["colorsNames"][1];
                            break;
                        case TProject.AchieveManager.REDCOUNT:
                            curcol = TProject.Boot.langConfig["colorsNames"][2];
                            break;
                        case TProject.AchieveManager.ORANGECOUNT:
                            curcol = TProject.Boot.langConfig["colorsNames"][3];
                            break;
                        case TProject.AchieveManager.YELLOWCOUNT:
                            curcol = TProject.Boot.langConfig["colorsNames"][4];
                            break;
                        case TProject.AchieveManager.ICECOUNT:
                            curcol = TProject.Boot.langConfig["colorsNames"][5];
                            break;
                        case TProject.AchieveManager.GREENCOUNT:
                            curcol = TProject.Boot.langConfig["colorsNames"][6];
                            break;
                        case TProject.AchieveManager.BLUECOUNT:
                            curcol = TProject.Boot.langConfig["colorsNames"][7];
                            break;
                        case TProject.AchieveManager.VIOLETCOUNT:
                            curcol = TProject.Boot.langConfig["colorsNames"][8];
                            break;
                        case TProject.AchieveManager.PURPLECOUNT:
                            curcol = TProject.Boot.langConfig["colorsNames"][9];
                            break;
                    }
                    _text = new Phaser.Text(this.game, cpx, cpy, TProject.Boot.changedString([TProject.Boot.gameConfig["colorAchieve"][i], curcol], TProject.Boot.langConfig["colorsAchieveText"]), {
                        font: "24px " + TProject.Boot.fontName,
                        fill: "#ffffff"
                    });
                    counttxt = 1;
                    while (_text.width > 350) {
                        _text.fontSize = 24 - counttxt;
                        counttxt += 1;
                    }
                    if (window.devicePixelRatio > 1) {
                        _text.resolution = TProject.Boot.dpiScaleFactor;
                    }
                    str += '"' + k + '' + i + '":{"frame":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height + '},"rotated":false,' +
                        '"trimmed":false,"spriteSourceSize":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height +
                        '},"sourceSize":{"w":' + _text.width + ',"h":' + _text.height + '}},';
                    this._textBitmapData.draw(this.game.make.sprite(0, 0, _text.generateTexture()), _text.x, _text.y);
                    cpx += _text.width + 1;
                    if (cpx >= 1700) {
                        cpx = 0;
                        cpy += 50;
                    }
                }
            }
            for (var i = 0; i < TProject.Boot.gameConfig["coinsCollectAchieve"].length; i++) {
                _text = new Phaser.Text(this.game, cpx, cpy, TProject.Boot.changedString([TProject.Boot.gameConfig["coinsCollectAchieve"][i]], TProject.Boot.langConfig["coinsCollectAchieveText"]), {
                    font: "24px " + TProject.Boot.fontName,
                    fill: "#ffffff"
                });
                counttxt = 1;
                while (_text.width > 350) {
                    _text.fontSize = 24 - counttxt;
                    counttxt += 1;
                }
                if (window.devicePixelRatio > 1) {
                    _text.resolution = TProject.Boot.dpiScaleFactor;
                }
                str += '"coinsCollect' + i + '":{"frame":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height + '},"rotated":false,' +
                    '"trimmed":false,"spriteSourceSize":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height +
                    '},"sourceSize":{"w":' + _text.width + ',"h":' + _text.height + '}},';
                this._textBitmapData.draw(this.game.make.sprite(0, 0, _text.generateTexture()), _text.x, _text.y);
                cpx += _text.width + 1;
                if (cpx >= 1700) {
                    cpx = 0;
                    cpy += 50;
                }
            }
            for (var i = 0; i < TProject.Boot.gameConfig["continueGameAchieve"].length; i++) {
                _text = new Phaser.Text(this.game, cpx, cpy, TProject.Boot.changedString([TProject.Boot.gameConfig["continueGameAchieve"][i]], TProject.Boot.langConfig["continueGamesAchieveText"]), {
                    font: "24px " + TProject.Boot.fontName,
                    fill: "#ffffff"
                });
                counttxt = 1;
                while (_text.width > 350) {
                    _text.fontSize = 24 - counttxt;
                    counttxt += 1;
                }
                if (window.devicePixelRatio > 1) {
                    _text.resolution = TProject.Boot.dpiScaleFactor;
                }
                str += '"continuedGames' + i + '":{"frame":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height + '},"rotated":false,' +
                    '"trimmed":false,"spriteSourceSize":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height +
                    '},"sourceSize":{"w":' + _text.width + ',"h":' + _text.height + '}},';
                this._textBitmapData.draw(this.game.make.sprite(0, 0, _text.generateTexture()), _text.x, _text.y);
                cpx += _text.width + 1;
                if (cpx >= 1700) {
                    cpx = 0;
                    cpy += 50;
                }
            }
            _text = new Phaser.Text(this.game, cpx, cpy, TProject.Boot.langConfig["newText"], {
                font: "24px " + TProject.Boot.fontName,
                fill: "#eb490f",
                stroke: "#fcff91",
                strokeThickness: 2
            });
            _text.resolution = window.devicePixelRatio;
            str += '"newText":{"frame":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height + '},"rotated":false,' +
                '"trimmed":false,"spriteSourceSize":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height +
                '},"sourceSize":{"w":' + _text.width + ',"h":' + _text.height + '}},';
            this._textBitmapData.draw(this.game.make.sprite(0, 0, _text.generateTexture()), _text.x, _text.y);
            cpx += _text.width + 1;
            if (cpx >= 1700) {
                cpx = 0;
                cpy += 50;
            }
            _text = new Phaser.Text(this.game, cpx, cpy, TProject.Boot.langConfig["gameOverText"], {
                font: "48px " + TProject.Boot.fontName,
                fill: "#242424"
            });
            str += '"gameOverTitle":{"frame":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height + '},"rotated":false,' +
                '"trimmed":false,"spriteSourceSize":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height +
                '},"sourceSize":{"w":' + _text.width + ',"h":' + _text.height + '}},';
            this._textBitmapData.draw(this.game.make.sprite(0, 0, _text.generateTexture()), _text.x, _text.y);
            cpx += _text.width + 1;
            if (cpx >= 1700) {
                cpx = 0;
                cpy += 50;
            }
            _text = new Phaser.Text(this.game, cpx, cpy, TProject.Boot.langConfig["againText"], {
                font: "46px " + TProject.Boot.fontName,
                fill: "#FFFFFF"
            });
            counttxt = 1;
            while (_text.width > 180) {
                _text.fontSize = 46 - counttxt;
                counttxt += 1;
            }
            str += '"againTitle":{"frame":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height + '},"rotated":false,' +
                '"trimmed":false,"spriteSourceSize":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height +
                '},"sourceSize":{"w":' + _text.width + ',"h":' + _text.height + '}},';
            this._textBitmapData.draw(this.game.make.sprite(0, 0, _text.generateTexture()), _text.x, _text.y);
            cpx += _text.width + 1;
            if (cpx >= 1700) {
                cpx = 0;
                cpy += 50;
            }
            _text = new Phaser.Text(this.game, cpx, cpy, "" + TProject.Boot.gameConfig["achievementReward"], {
                font: "24px " + TProject.Boot.fontName,
                fill: "#000000"
            });
            if (window.devicePixelRatio > 1) {
                _text.resolution = TProject.Boot.dpiScaleFactor;
            }
            str += '"achieveReward":{"frame":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height + '},"rotated":false,' +
                '"trimmed":false,"spriteSourceSize":{"x":' + _text.x + ',"y":' + _text.y + ',"w":' + _text.width + ',"h":' + _text.height +
                '},"sourceSize":{"w":' + _text.width + ',"h":' + _text.height + '}}';
            this._textBitmapData.draw(this.game.make.sprite(0, 0, _text.generateTexture()), _text.x, _text.y);
            cpx += _text.width + 1;
            if (cpx >= 1700) {
                cpx = 0;
                cpy += 50;
            }
            str += '}}';
            this.game.cache.addTextureAtlas("menuTextAtlas", null, this._textBitmapData.canvas, JSON.parse(str), Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
            this.game.cache.getBaseTexture("menuTextAtlas").textureIndex = TProject.Boot.texturesArray.length + 1;
            TProject.Boot.texturesArray.length++;
            console.log(cpx + " - cpx; " + cpy + " - cpy.");
        };
        Level.prototype.showHandHint = function () {
            var _this = this;
            if (this._showHand) {
                this._handSprite.bringToTop();
                this._handSprite.visible = true;
                this.game.tweens.removeFrom(this._handSprite);
                var blockID = 0;
                if (this._tutorialStep == 1) {
                    blockID = 94;
                }
                else if (this._tutorialStep == 2) {
                    blockID = 0;
                }
                this._handSprite.position.set(this._midPanel.x - 10, this._midPanel.y - 10);
                this.game.add.tween(this._handSprite).to({ alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                var px = 0;
                var py = 0;
                px = (this._gameField.fieldBlockPosition(blockID).x - this._blocksGroup.x) / this._blocksGroup.scale.x;
                py = (this._gameField.fieldBlockPosition(blockID).y - this._blocksGroup.y) / this._blocksGroup.scale.y;
                this.game.add.tween(this._handSprite).to({ x: px, y: py }, 1700, Phaser.Easing.Cubic.Out, true, 200).onComplete.addOnce(function () {
                    _this.game.add.tween(_this._handSprite).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                }, this);
            }
        };
        Level.prototype.initiateTutorial = function () {
            var _this = this;
            this.game.time.events.add(600, function () {
                _this.showTutorText(TProject.Boot.langConfig["tutorialStepTexts"][0][1], 0, -180, TProject.Boot.langConfig["tutorialStepTexts"][0][0]);
            }, this);
            this._tutorialStep = 1;
            this._tutorTimer = this.game.time.create(false);
            this._tutorTimer.loop(2300, this.showHandHint, this);
            this._showHand = true;
            if (this.game.device.desktop || this.game.scale.isLandscape) {
                this._midBlock = new TProject.LineTwo(this.game, this._midPanel.x + this.game.width / 2, this._midPanel.y, 0, TProject.FieldBlock.ICE);
                this.game.tweens.removeFrom(this._midBlock);
                this.game.add.tween(this._midBlock).to({ x: this._midPanel.x }, 250, Phaser.Easing.Cubic.Out, true, 100);
            }
            else {
                this._midBlock = new TProject.LineTwo(this.game, this._midPanel.x, this._midPanel.y + 480, 0, TProject.FieldBlock.ICE);
                this.game.tweens.removeFrom(this._midBlock);
                this.game.add.tween(this._midBlock).to({ y: this._midPanel.y }, 250, Phaser.Easing.Cubic.Out, true, 100);
            }
            this._midBlock.inputEnabled = true;
            this._midBlock.input.enableDrag(true);
            this._midBlock.events.onDragStart.add(this.dragIt, this);
            this._midBlock.events.onDragUpdate.add(this.updateDrag, this);
            this._midBlock.input.dragOffset.set(0, -this._midBlock.halfHeight);
            this._midBlock.events.onDragStop.add(this.stopDrag, this);
            this._blocksGroup.add(this._midBlock);
            if (!this.game.device.desktop) {
                this._midBlock.input.dragOffset.set(0, -this._midBlock.halfHeight * 2);
            }
            this._blocksGroup.add(this._handSprite);
            this._handSprite.visible = false;
            this._gameField.initiateTutorial();
            this.game.time.events.add(50, this.showHandHint, this);
            this._tutorTimer.start();
        };
        Level.prototype.showSecondTutorialPart = function () {
            this.showTutorText(TProject.Boot.langConfig["tutorialStepTexts"][1][1], 0, 240, TProject.Boot.langConfig["tutorialStepTexts"][1][0]);
            this._tutorialStep = 2;
            this._showHand = true;
            if (this.game.device.desktop || this.game.scale.isLandscape) {
                this._midBlock = new TProject.NookThree(this.game, this._midPanel.x + this.game.width / 2, this._midPanel.y, 0, TProject.FieldBlock.ORANGE);
                this.game.tweens.removeFrom(this._midBlock);
                this.game.add.tween(this._midBlock).to({ x: this._midPanel.x }, 250, Phaser.Easing.Cubic.Out, true, 100);
            }
            else {
                this._midBlock = new TProject.NookThree(this.game, this._midPanel.x, this._midPanel.y + 480, 0, TProject.FieldBlock.ORANGE);
                this.game.tweens.removeFrom(this._midBlock);
                this.game.add.tween(this._midBlock).to({ y: this._midPanel.y }, 250, Phaser.Easing.Cubic.Out, true, 100);
            }
            this._midBlock.inputEnabled = true;
            this._midBlock.input.enableDrag(true);
            this._midBlock.events.onDragStart.add(this.dragIt, this);
            this._midBlock.events.onDragUpdate.add(this.updateDrag, this);
            this._midBlock.input.dragOffset.set(0, -this._midBlock.halfHeight);
            this._midBlock.events.onDragStop.add(this.stopDrag, this);
            this._blocksGroup.add(this._midBlock);
            if (!this.game.device.desktop) {
                this._midBlock.input.dragOffset.set(0, -this._midBlock.halfHeight * 2);
            }
            this._handSprite.visible = false;
            this._tutorTimer.stop(false);
            this.game.time.events.add(50, this.showHandHint, this);
            this._tutorTimer.start();
            this._gameField.showSecondTutorPart();
        };
        Level.prototype.disableTutorial = function () {
            this._handSprite.visible = false;
            this.showTutorText(TProject.Boot.langConfig["tutorialStepTexts"][2][1], 0, 240, TProject.Boot.langConfig["tutorialStepTexts"][2][0], 1000);
            this._tutorTimer.destroy();
            TProject.Boot.firstTimePlay = false;
            localStorage.setItem("firstTime", "ft");
            this._gameField.endTheTutorial();
            this.checkBlocks();
        };
        Level.prototype.showTutorText = function (descriptionText, x, y, headerText, timeToDissapear) {
            if (headerText === void 0) { headerText = ""; }
            if (timeToDissapear === void 0) { timeToDissapear = -1; }
            this.game.tweens.removeFrom(this._tutorialTextContainer);
            this._tutorialTextContainer.visible = true;
            this._tutorialTextContainer.alpha = 0;
            this._tutorialTextContainer.position.set(x, y - 100);
            this._tutorialDescriptionText.text = descriptionText;
            this._tutorialHeaderText.text = headerText;
            this._tutorialTextBack.width = Math.max(444, this._tutorialHeaderText.width, this._tutorialDescriptionText.width);
            this.game.add.tween(this._tutorialTextContainer).to({ y: y, alpha: 1 }, 300, Phaser.Easing.Linear.None, true);
            if (timeToDissapear > 0) {
                this.game.add.tween(this._tutorialTextContainer).to({ y: y + 100, alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 300 + timeToDissapear);
            }
        };
        Level.prototype.hideTutorText = function () {
            this.game.tweens.removeFrom(this._tutorialTextContainer);
            this._tutorialTextContainer.visible = false;
        };
        Level.prototype.addNewAchieve = function () {
            console.log(TProject.Boot.achieveManager.getAchieveById(arguments[0]));
            if (!this._popUpAchieveBack.visible) {
                this.showNewAchieve(TProject.Boot.achieveManager.getAchieveById(arguments[0]));
            }
            else {
                this._newAchievesIds.push(arguments[0]);
            }
        };
        Level.prototype.checkNewAchieveList = function () {
            if (this._newAchievesIds.length > 0) {
                this.showNewAchieve(TProject.Boot.achieveManager.getAchieveById(this._newAchievesIds.shift()));
            }
            else {
                this._popUpAchieveBack.visible = false;
            }
        };
        Level.prototype.showNewAchieve = function (ach) {
            this._popUpAchieveBack.visible = true;
            this._popUpAchieveIcon.frameName = ach.iconFrameName;
            if (!(this.game.renderer.type == Phaser.CANVAS)) {
                this._popUpAchieveDescription.frameName = ach.titleFrameName;
            }
            else {
                this._popUpAchieveDescription.text = ach.titleText;
            }
            this.game.add.tween(this._popUpAchieveBack).to({ y: 90 }, 500, Phaser.Easing.Sinusoidal.InOut, true);
            this.game.time.events.add(3500, function () {
                this.game.add.tween(this._popUpAchieveBack).to({ y: -200 }, 500, Phaser.Easing.Sinusoidal.InOut, true).onComplete.addOnce(function () {
                    this.checkNewAchieveList();
                }, this);
            }, this);
        };
        Level.prototype.checkContinue = function () {
            if (arguments[0] == "accept") {
                this.hideContinuePopUp(false);
            }
            else {
                this.hideContinuePopUp(true);
            }
        };
        Level.prototype.showBonusPopUp = function () {
            this._popUpGroup.visible = true;
            this._popupBlackScreen.visible = true;
            this._popupBlackScreen.alpha = 0;
            this.game.add.tween(this._popupBlackScreen).to({ alpha: 0.75 }, 400, Phaser.Easing.Cubic.Out, true);
            this._purchaseBtn.events.onInputUp.removeAll();
            this._moneyIcon.alpha = 0;
            this._moneyValue.alpha = 0;
            this._moneyValue.text = TProject.Boot.currentMoney + "";
            this._bonusIcon.alpha = 0;
            this._bonusIcon.position.set(0, -130);
            this._bonusDescription.alpha = 0;
            this._purchaseBtn.alpha = 0;
            this._purchaseBtn.position.y += 100;
            this._closeBtn.alpha = 0;
            this._closeBtn.position.y += 100;
            if (TProject.Boot.currentMoney < TProject.Boot.gameConfig["boosterPrice"]) {
                this._purchaseBtn.events.onInputUp.add(this.shakeCoins, this);
                this._purchaseBtn.frameName = "greyButtonGift";
                this._purchaseBtnAdditionalText.visible = true;
                this._purchaseBtnCoinText.fill = "#f44336";
            }
            else {
                this._purchaseBtn.events.onInputUp.add(this.buyTheBooster, this);
                this._purchaseBtn.frameName = "greenButtonGift";
                this._purchaseBtnAdditionalText.visible = false;
                this._purchaseBtnCoinText.fill = "#ffffff";
            }
            this.game.add.tween(this._moneyIcon).to({ alpha: 1 }, 400, Phaser.Easing.Sinusoidal.InOut, true, 100);
            this.game.add.tween(this._moneyValue).to({ alpha: 1 }, 400, Phaser.Easing.Sinusoidal.InOut, true, 200);
            this.game.add.tween(this._bonusIcon).to({ alpha: 1 }, 400, Phaser.Easing.Sinusoidal.InOut, true, 300);
            this.game.add.tween(this._bonusDescription).to({ alpha: 1 }, 400, Phaser.Easing.Sinusoidal.InOut, true, 400);
            this.game.add.tween(this._purchaseBtn).to({ alpha: 1, y: this._purchaseBtn.y - 100 }, 400, Phaser.Easing.Cubic.Out, true, 500);
            this.game.add.tween(this._closeBtn).to({ alpha: 1, y: this._closeBtn.y - 100 }, 400, Phaser.Easing.Cubic.Out, true, 600);
        };
        Level.prototype.shakeCoins = function () {
            this.game.tweens.removeFrom(this._moneyIcon);
            this.game.add.tween(this._moneyIcon).to({ x: this._moneyIcon.x + 5 }, 100, Phaser.Easing.Sinusoidal.InOut, true, 0, 3, true);
        };
        Level.prototype.hideBonusPopUp = function () {
            this.game.add.tween(this._moneyIcon).to({ alpha: 0 }, 200, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this._moneyValue).to({ alpha: 0 }, 200, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this._bonusDescription).to({ alpha: 0 }, 200, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this._bonusIcon).to({ alpha: 0 }, 200, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this._purchaseBtn).to({ alpha: 0 }, 200, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this._closeBtn).to({ alpha: 0 }, 200, Phaser.Easing.Cubic.Out, true);
            this.game.time.events.add(200, function () {
                this._popUpGroup.visible = false;
            }, this);
            this.game.add.tween(this._popupBlackScreen).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true).onComplete.addOnce(function () {
                this._popupBlackScreen.visible = false;
            }, this);
        };
        Level.prototype.buyTheBooster = function () {
            console.warn('currentMoney: '+TProject.Boot.currentMoney+', booster price: '+TProject.Boot.gameConfig["boosterPrice"]);
            TProject.Boot.currentMoney -= TProject.Boot.gameConfig["boosterPrice"];
            switch (this._currentBoosterType) {
                case Level.POINTMULT:
                    this._boosterStep = 3;
                    this._boosterPointsMultiplier = 1.5;
                    break;
                case Level.COMBOSCORE:
                    this._boosterStep = 10;
                    this._boosterComboMultiplier = 3;
                    break;
                case Level.COMBODURATION:
                    this._boosterStep = 10;
                    this._boosterComboDelay = 5000;
                    break;
            }
            this.updateBoosterState(true);
            this.hideBonusPopUp();
            this.hideGift();
        };
        Level.prototype.createBonusPopUp = function () {
            this._popupBlackScreen = this.game.add.sprite(0, 0, "gameAssets", "bg");
            this._popupBlackScreen.inputEnabled = true;
            this._popupBlackScreen.alpha = 0.75;
            this._popupBlackScreen.visible = false;
            this._popUpGroup = this.game.add.group();
            this._purchaseBtn = this.game.make.sprite(0, 100, "gameAssets", "greenButtonGift");
            this._purchaseBtn.anchor.set(0.5, 0.5);
            this._purchaseBtn.inputEnabled = true;
            this._purchaseBtn.events.onInputUp.add(this.buyTheBooster, this);
            var coinIcon = this.game.make.sprite(-this._purchaseBtn.width / 2 + 30, 0, "gameAssets", "coin");
            coinIcon.anchor.set(0.5, 0.5);
            this._purchaseBtnCoinText = this.game.make.text(coinIcon.x + coinIcon.width / 2, 0, TProject.Boot.gameConfig["boosterPrice"] + "", {
                font: "28px " + TProject.Boot.fontName,
                fill: "#FFFFFF"
            });
            this._purchaseBtnCoinText.anchor.set(0, 0.5);
            this._purchaseBtnDescriptionText = this.game.make.text(this._purchaseBtn.width / 6, 0, TProject.Boot.langConfig["purchaseText"], {
                font: "28px " + TProject.Boot.fontName,
                fill: "#FFFFFF"
            });
            this._purchaseBtnDescriptionText.anchor.set(0.5, 0.5);
            this._purchaseBtnAdditionalText = this.game.make.text(0, this._purchaseBtn.height / 2 + 20, TProject.Boot.langConfig["notEnoughCoins"], {
                font: "24px " + TProject.Boot.fontName,
                fill: "#FFFFFF"
            });
            this._purchaseBtnAdditionalText.anchor.set(0.5, 0.5);
            this._purchaseBtn.addChild(coinIcon);
            this._purchaseBtn.addChild(this._purchaseBtnCoinText);
            this._purchaseBtn.addChild(this._purchaseBtnDescriptionText);
            this._purchaseBtn.addChild(this._purchaseBtnAdditionalText);
            this._closeBtn = this.game.make.sprite(this._purchaseBtn.x + 200, this._purchaseBtn.y, "gameAssets", "closeButton");
            this._closeBtn.anchor.set(0.5, 0.5);
            this._closeBtn.inputEnabled = true;
            this._closeBtn.events.onInputUp.add(this.hideBonusPopUp, this);
            this._bonusIcon = this.game.make.sprite(0, -130, "gameAssets", "boosterIcon");
            this._bonusIcon.anchor.set(0.5, 0.5);
            this._moneyIcon = this.game.make.sprite(-40, -220, "gameAssets", "coin");
            this._moneyIcon.anchor.set(0.5, 0.5);
            this._bonusDescription = this.game.make.text(0, this._bonusIcon.y + this._bonusIcon.width / 2 + 60, "", {
                font: "28px " + TProject.Boot.fontName,
                fill: "#FFFFFF",
                wordWrap: true,
                wordWrapWidth: 600
            });
            this._bonusDescription.anchor.set(0.5, 0);
            this._moneyValue = this.game.make.text(this._moneyIcon.x + this._moneyIcon.width / 2 + 20, this._moneyIcon.y, "1231233", {
                font: "28px " + TProject.Boot.fontName,
                fill: "#FFFFFF"
            });
            this._moneyValue.anchor.set(0, 0.5);
            this._popUpGroup.add(this._moneyIcon);
            this._popUpGroup.add(this._moneyValue);
            this._popUpGroup.add(this._bonusIcon);
            this._popUpGroup.add(this._bonusDescription);
            this._popUpGroup.add(this._purchaseBtn);
            this._popUpGroup.add(this._closeBtn);
            this._popUpGroup.visible = false;
        };
        Level.prototype.createPauseScreen = function () {
            this._pauseGroup = this.game.add.group();
            this._continueBtn = new TProject.UIButton(this.game, 0, -70, "playButtonPause", this.hidePause.bind(this));
            this._replayBtn = new TProject.UIButton(this.game, 0, 100, "restartButtonPause", this.restartLevel.bind(this));
            this._musicBtn = new TProject.UIButton(this.game, 240, 440, "musOn", function () { TProject.GameEvent.onMusicChange.dispatch(); }, "musOff", TProject.Boot.musicEnable);
            this._soundBtn = new TProject.UIButton(this.game, 160, 440, "soundOn", function () { TProject.GameEvent.onSfxChange.dispatch(); }, "soundOff", TProject.Boot.sfxEnable);
            this._highScoreDescriptionText = this.game.make.text(0, -200, TProject.Boot.langConfig["highScoreText"], {
                font: "30px " + TProject.Boot.fontName,
                fill: "#FFFFFF"
            });
            this._highScoreDescriptionText.anchor.set(0.5, 0.5);
            this._highScoreValueText = this.game.make.text(0, this._highScoreDescriptionText.y - this._highScoreDescriptionText.height - 15, TProject.Boot.highScorePoints + "", {
                font: "36px " + TProject.Boot.fontName,
                fill: "#ffffff"
            });
            this._highScoreValueText.anchor.set(0.5, 0.5);
            this._pauseGroup.add(this._continueBtn);
            this._pauseGroup.add(this._replayBtn);
            this._pauseGroup.add(this._musicBtn);
            this._pauseGroup.add(this._soundBtn);
            this._pauseGroup.add(this._highScoreDescriptionText);
            this._pauseGroup.add(this._highScoreValueText);
            this._highScoreDescriptionText.visible = false;
            this._highScoreValueText.visible = false;
            this._continueBtn.hideBtn(true);
            this._replayBtn.hideBtn(true);
            this._musicBtn.hideBtn(true);
            this._soundBtn.hideBtn(true);
        };
        Level.prototype.showPause = function () {
            this.showIngameBlackFilter();
            this._highScoreValueText.text = TProject.Boot.highScorePoints + "";
            this._highScoreDescriptionText.visible = true;
            this._highScoreValueText.visible = true;
            sdkHandler.trigger('beforePlayButtonDisplay', {
                callback: () => {
                    console.log("--fx--beforePlayButtonDisplay--");
                    this._continueBtn.showBtn();
                    this._replayBtn.showBtn();
                }
            }, this);
            this._musicBtn.showBtn();
            this._soundBtn.showBtn();
        };
        Level.prototype.hidePause = function () {
            this.hideIngameBlackFilter();
            this._highScoreDescriptionText.visible = false;
            this._highScoreValueText.visible = false;
            this._continueBtn.hideBtn();
            this._replayBtn.hideBtn();
            this._musicBtn.hideBtn();
            this._soundBtn.hideBtn();
        };
        Level.prototype.showIngameBlackFilter = function (defAlpha) {
            if (defAlpha === void 0) { defAlpha = 0.7; }
            this.game.tweens.removeFrom(this._overBlackScreen);
            this._overBlackScreen.visible = true;
            this._overBlackScreen.alpha = 0;
            this.game.add.tween(this._overBlackScreen).to({ alpha: defAlpha }, 300, Phaser.Easing.Linear.None, true);
        };
        Level.prototype.hideIngameBlackFilter = function () {
            this.game.tweens.removeFrom(this._overBlackScreen);
            this.game.add.tween(this._overBlackScreen).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true).onComplete.addOnce(function () {
                this._overBlackScreen.visible = false;
            }, this);
        };
        Level.prototype.createLoseScreen = function () {
            this._overBlackScreen = this.game.add.sprite(0, 0, "gameAssets", "bg");
            this._overBlackScreen.inputEnabled = true;
            this._overBlackScreen.alpha = 0.75;
            this._overBlackScreen.visible = false;
            this._overRedScreen = this.game.add.sprite(0, 0, "gameAssets", "redOverlay");
            this._overRedScreen.anchor.set(0.5, 0.5);
            this._overRedScreen.visible = false;
            this._noMoreMovesBack = this.game.make.sprite(0, 0, "gameAssets", "gameoverPanel");
            this._noMoreMovesBack.anchor.set(0.5, 0.5);
            this._noMoreMovesBack.visible = false;
            var noMoreMovesHeader = this.game.make.text(0, -20, TProject.Boot.langConfig["noMoreMovesText"][0], {
                font: "40px " + TProject.Boot.fontName,
                fill: "#0e0e0e"
            });
            noMoreMovesHeader.anchor.set(0.5, 0.5);
            var noMoreMovesDescription = this.game.make.text(0, 30, TProject.Boot.langConfig["noMoreMovesText"][1], {
                font: "24px " + TProject.Boot.fontName,
                fill: "#0e0e0e"
            });
            noMoreMovesDescription.anchor.set(0.5, 0.5);
            this._noMoreMovesBack.addChild(noMoreMovesHeader);
            this._noMoreMovesBack.addChild(noMoreMovesDescription);
            this._overGroup = this.game.add.group();
            this._overPopUp = new TProject.OverPopUp(this.game, 0, 0);
            this._continuePopUp = new TProject.ContinuePopUp(this.game, 0, 0);
            this._overGroup.add(this._noMoreMovesBack);
            this._overGroup.add(this._continuePopUp);
            this._overGroup.add(this._overRedScreen);
            this._overGroup.add(this._overPopUp);
            this._overPopUp.visible = false;
            this._continuePopUp.visible = false;
        };
        Level.prototype.resetCombo = function () {
            this._currentCombo = 0;
            this._comboTimer.stop(false);
        };
        Level.prototype.checkCombo = function () {
            if (this._comboTimer.running) {
                this._comboTimer.stop(false);
            }
            var totalSum = 0;
            var finalScore = 0;
            for (var i = 0; i < arguments[0]; i++) {
                this._currentCombo++;
                if (this._currentCombo < 4) {
                    totalSum += 15;
                }
                else if (this._currentCombo < 7) {
                    totalSum += 25;
                }
                else {
                    totalSum += 35;
                }
            }
            TProject.Boot.removedLinesAtRow = Math.max(TProject.Boot.removedLinesAtRow, this._currentCombo);
            finalScore = ((arguments[0] + totalSum) * this._boosterComboMultiplier) * (1 + (TProject.Boot.gameConfig["achievementBonus"] * TProject.Boot.achieveManager.openedCount / 100));
            TProject.Boot.addMoney(Math.ceil((finalScore) / 10));
            this.addScore(finalScore);
            this.showMoodUp(this._currentCombo);
            this._comboTimer.start(this._boosterComboDelay);
            this.saveGame();
            if (TProject.Boot.firstTimePlay) {
                if (this._tutorialStep == 1) {
                    this.showSecondTutorialPart();
                }
                else if (this._tutorialStep == 2) {
                    this.disableTutorial();
                }
            }
        };
        Level.prototype.showMoodUp = function (comboCount) {
            this.game.tweens.removeFrom(this._moodUpBack);
            this.game.tweens.removeFrom(this._moodUpText1);
            this._moodUpBack.visible = true;
            this._moodUpBack.angle = 0;
            this._moodUpContainer.visible = true;
            this._moodUpBack.scale.set(0, 0);
            this._moodUpContainer.scale.set(0, 0);
            this._moodUpBack.alpha = 1;
            this._moodUpContainer.alpha = 1;
            this._moodUpText1.text = this._shotOuts[Math.floor(Math.random() * this._shotOuts.length)];
            this._moodUpText1.position.set(0, 0);
            this._moodUpText1.addColor("#ffffff", 0);
            this._moodUpText1.visible = true;
            this._moodUpText2.visible = false;
            if (comboCount > 1) {
                this._moodUpText1.position.set(0, 50);
                this._moodUpText2.position.set(0, -50);
                this._moodUpText2.visible = true;
                this._moodUpText2.text = comboCount + "";
                this._moodUpText1.text = TProject.Boot.langConfig["comboText"];
            }
            else {
                this._moodUpBack.visible = false;
            }
            if (comboCount == 3) {
                this._comboParticleEmmiter.explode(5000, 80);
            }
            else if (comboCount >= 4) {
                this._comboParticleEmmiter.explode(5000, 140);
            }
            this.game.add.tween(this._moodUpBack.scale).to({ x: 1, y: 1 }, 300, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this._moodUpContainer.scale).to({ x: 1, y: 1 }, 300, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this._moodUpContainer).to({ alpha: 0 }, 200, Phaser.Easing.Cubic.Out, true, 900);
            this.game.add.tween(this._moodUpBack).to({ alpha: 0 }, 200, Phaser.Easing.Cubic.Out, true, 900);
            this.game.add.tween(this._moodUpBack).to({ angle: 90 }, 1300, Phaser.Easing.Cubic.Out, true);
            this.game.time.events.add(1100, this.hideMoodUp, this);
        };
        Level.prototype.hideMoodUp = function () {
            this._moodUpBack.visible = false;
            this._moodUpText1.visible = false;
        };
        Level.prototype.setScore = function (score) {
            this.game.tweens.removeFrom(this);
            this._currScore = parseInt(this._scoreText.text);
            var tw = this.game.add.tween(this).to({ _currScore: score }, 350, Phaser.Easing.Linear.None, true);
            tw.onUpdateCallback(function () {
                this._scoreText.text = Math.floor(this._currScore) + "";
            }, this);
            tw.onComplete.addOnce(function () {
                this._scoreText.text = score + "";
                tw = null;
            }, this);
        };
        Level.prototype.arraySum = function (numArray) {
            var s = 0;
            for (var i = 0; i < numArray.length; i++) {
                s += numArray[i];
            }
            return s;
        };
        Level.prototype.weightedRandom = function (valArr, weightArr) {
            var total = this.arraySum(weightArr);
            var cs = 0;
            var rn = Math.floor(Math.random() * total) + 1;
            for (var i = 0; i < valArr.length; i++) {
                cs += weightArr[i];
                if (cs >= rn) {
                    return valArr[i];
                }
            }
        };
        Level.prototype.addScore = function (score) {
            this._gameScore += Math.ceil(score * this._boosterPointsMultiplier);
            TProject.GameEvent.onScoreChange.dispatch(this._gameScore);
            this.setScore(this._gameScore);
            this.checkRank();
            TProject.Boot.totalPoints = this._gameScore;
            TProject.Boot.highScorePoints = Math.max(TProject.Boot.highScorePoints, TProject.Boot.totalPoints);
            TProject.GameEvent.achieveSignal.dispatch();
        };
        Level.prototype.createBlocks = function () {
            this._blocksGroup = this.game.add.group();
            if (!TProject.Boot.firstTimePlay) {
                this.checkBlocks(this._prevSessionExist);
            }
        };
        Level.prototype.getRandomBlock = function (x, y) {
            var randBlock = this.weightedRandom(this._elementsList, this._elementsWeightList);
            switch (randBlock) {
                case "Dot":
                    return new TProject.SimpleDot(this.game, x, y);
                    break;
                case "SquareTwo":
                    return new TProject.SquareTwo(this.game, x, y);
                    break;
                case "SquareThree":
                    return new TProject.SquareThree(this.game, x, y);
                    break;
                case "LineTwo":
                    return new TProject.LineTwo(this.game, x, y);
                    break;
                case "LineThree":
                    return new TProject.LineThree(this.game, x, y);
                    break;
                case "LineFour":
                    return new TProject.LineFour(this.game, x, y);
                    break;
                case "LineFive":
                    return new TProject.LineFive(this.game, x, y);
                    break;
                case "NookTwo":
                    return new TProject.NookTwo(this.game, x, y);
                    break;
                case "NookThree":
                    return new TProject.NookThree(this.game, x, y);
                    break;
                case "NookFour":
                    return new TProject.NookFour(this.game, x, y);
                    break;
            }
        };
        Level.prototype.checkBlocksOnStone = function () {
            var gameOver = true;
            if (this._leftBlock != null) {
                this._gameField.checkIfStone(this._leftBlock);
                if (!this._leftBlock.isItStone) {
                    gameOver = false;
                }
            }
            if (this._midBlock != null) {
                this._gameField.checkIfStone(this._midBlock);
                if (!this._midBlock.isItStone) {
                    gameOver = false;
                }
            }
            if (this._rightBlock != null) {
                this._gameField.checkIfStone(this._rightBlock);
                if (!this._rightBlock.isItStone) {
                    gameOver = false;
                }
            }
            if (gameOver) {
                sdkHandler.trigger('beforePlayButtonDisplay', {
                    callback: () => {
                        if (this._gameField.wasLineAnimated) {
                            this.game.time.events.add(1400, this.showNoMoreMoves, this);
                        }
                        else {
                            this.showNoMoreMoves();
                        }
                    }
                }, this)
            }
        };
        Level.prototype.checkBlocks = function (prevSession) {
            if (prevSession === void 0) { prevSession = false; }
            if (TProject.Boot.firstTimePlay) {
                return;
            }
            if (prevSession) {
                if (this._leftBlock == null && this._midBlock == null && this._rightBlock == null) {
                    this.resetBlocks(prevSession);
                }
            }
            else {
                if (this._leftBlock == null && this._midBlock == null && this._rightBlock == null) {
                    this.resetBlocks();
                }
                this.checkBlocksOnStone();
            }
        };
        Level.prototype.resetBlocks = function (needCorrectBlocks) {
            if (needCorrectBlocks === void 0) { needCorrectBlocks = false; }
            if (this._leftBlock != null) {
                this.removeExistingBlocks(this._leftBlock);
            }
            if (this._midBlock != null) {
                this.removeExistingBlocks(this._midBlock);
            }
            if (this._rightBlock != null) {
                this.removeExistingBlocks(this._rightBlock);
            }
            if (this.game.device.desktop || this.game.scale.isLandscape) {
                if (needCorrectBlocks) {
                    do {
                        this._leftBlock = this.getRandomBlock(this._leftPanel.x + this.game.width / 2, this._leftPanel.y);
                    } while (this._gameField.checkIfStone(this._leftBlock));
                    do {
                        this._midBlock = this.getRandomBlock(this._midPanel.x + this.game.width / 2, this._midPanel.y);
                    } while (this._gameField.checkIfStone(this._midBlock));
                    do {
                        this._rightBlock = this.getRandomBlock(this._rightPanel.x + this.game.width / 2, this._rightPanel.y);
                    } while (this._gameField.checkIfStone(this._rightBlock));
                }
                else {
                    this._leftBlock = this.getRandomBlock(this._leftPanel.x + this.game.width / 2, this._leftPanel.y);
                    this._midBlock = this.getRandomBlock(this._midPanel.x + this.game.width / 2, this._midPanel.y);
                    this._rightBlock = this.getRandomBlock(this._rightPanel.x + this.game.width / 2, this._rightPanel.y);
                }
                this.game.tweens.removeFrom(this._leftBlock);
                this.game.add.tween(this._leftBlock).to({ x: this._leftPanel.x }, 250, Phaser.Easing.Cubic.Out, true);
                this.game.tweens.removeFrom(this._midBlock);
                this.game.add.tween(this._midBlock).to({ x: this._midPanel.x }, 250, Phaser.Easing.Cubic.Out, true, 100);
                this.game.tweens.removeFrom(this._rightBlock);
                this.game.add.tween(this._rightBlock).to({ x: this._rightPanel.x }, 250, Phaser.Easing.Cubic.Out, true, 200);
            }
            else {
                if (needCorrectBlocks) {
                    do {
                        this._leftBlock = this.getRandomBlock(this._leftPanel.x, this._leftPanel.y + 480);
                    } while (this._gameField.checkIfStone(this._leftBlock));
                    do {
                        this._midBlock = this.getRandomBlock(this._midPanel.x, this._midPanel.y + 480);
                    } while (this._gameField.checkIfStone(this._midBlock));
                    do {
                        this._rightBlock = this.getRandomBlock(this._rightPanel.x, this._rightPanel.y + 480);
                    } while (this._gameField.checkIfStone(this._rightBlock));
                }
                else {
                    this._leftBlock = this.getRandomBlock(this._leftPanel.x, this._leftPanel.y + 480);
                    this._midBlock = this.getRandomBlock(this._midPanel.x, this._midPanel.y + 480);
                    this._rightBlock = this.getRandomBlock(this._rightPanel.x, this._rightPanel.y + 480);
                }
                this.game.tweens.removeFrom(this._leftBlock);
                this.game.add.tween(this._leftBlock).to({ y: this._leftPanel.y }, 250, Phaser.Easing.Cubic.Out, true);
                this.game.tweens.removeFrom(this._midBlock);
                this.game.add.tween(this._midBlock).to({ y: this._midPanel.y }, 250, Phaser.Easing.Cubic.Out, true, 100);
                this.game.tweens.removeFrom(this._rightBlock);
                this.game.add.tween(this._rightBlock).to({ y: this._rightPanel.y }, 250, Phaser.Easing.Cubic.Out, true, 200);
            }
            this._leftBlock.inputEnabled = true;
            this._leftBlock.input.enableDrag(true);
            this._leftBlock.events.onDragStart.add(this.dragIt, this);
            this._leftBlock.events.onDragUpdate.add(this.updateDrag, this);
            this._leftBlock.input.dragOffset.set(0, -this._leftBlock.halfHeight);
            this._leftBlock.events.onDragStop.add(this.stopDrag, this);
            this._blocksGroup.add(this._leftBlock);
            this._midBlock.inputEnabled = true;
            this._midBlock.input.enableDrag(true);
            this._midBlock.events.onDragStart.add(this.dragIt, this);
            this._midBlock.events.onDragUpdate.add(this.updateDrag, this);
            this._midBlock.input.dragOffset.set(0, -this._midBlock.halfHeight);
            this._midBlock.events.onDragStop.add(this.stopDrag, this);
            this._blocksGroup.add(this._midBlock);
            this._rightBlock.inputEnabled = true;
            this._rightBlock.input.enableDrag(true);
            this._rightBlock.events.onDragStart.add(this.dragIt, this);
            this._rightBlock.events.onDragUpdate.add(this.updateDrag, this);
            this._rightBlock.input.dragOffset.set(0, -this._rightBlock.halfHeight);
            this._rightBlock.events.onDragStop.add(this.stopDrag, this);
            this._blocksGroup.add(this._rightBlock);
            if (!this.game.device.desktop) {
                this._leftBlock.input.dragOffset.set(0, -this._leftBlock.halfHeight * 2);
                this._midBlock.input.dragOffset.set(0, -this._midBlock.halfHeight * 2);
                this._rightBlock.input.dragOffset.set(0, -this._rightBlock.halfHeight * 2);
            }
        };
        Level.prototype.stopDrag = function (sprite, pointer) {
            var fieldId = this._gameField.getOverlapTiles(sprite);
            this._gameField.unhintTheField();
            if (fieldId != -1) {
                if (TProject.Boot.sfxEnable) {
                    this._insertSound.play();
                }
                this.addScore(sprite.blockScore);
                this.game.tweens.removeFrom(sprite);
                this._gameField.fillTheShape(fieldId, sprite);
                this._blocksGroup.remove(sprite);
                sprite.events.onDragStart.removeAll(this);
                sprite.events.onDragUpdate.removeAll(this);
                sprite.events.onDragStop.removeAll(this);
                sprite.destroy();
                if (sprite == this._leftBlock) {
                    this._leftBlock = null;
                }
                else if (sprite == this._midBlock) {
                    this._midBlock = null;
                }
                else if (sprite == this._rightBlock) {
                    this._rightBlock = null;
                }
                this.checkBlocks();
            }
            else {
                sprite.scaleDown();
                if (sprite == this._leftBlock) {
                    this.game.add.tween(sprite).to({ x: this._leftPanel.x, y: this._leftPanel.y }, 200, Phaser.Easing.Cubic.Out, true);
                }
                else if (sprite == this._midBlock) {
                    this.game.add.tween(sprite).to({ x: this._midPanel.x, y: this._midPanel.y }, 200, Phaser.Easing.Cubic.Out, true);
                }
                else if (sprite == this._rightBlock) {
                    this.game.add.tween(sprite).to({ x: this._rightPanel.x, y: this._rightPanel.y }, 200, Phaser.Easing.Cubic.Out, true);
                }
            }
            if (TProject.Boot.firstTimePlay) {
                this._showHand = true;
            }
            this.saveGame();
        };
        Level.prototype.updateDrag = function (sprite, pointer) {
            if (!this._isSinglePlace) {
                this._gameField.unhintTheField();
                this._gameField.showBlockShadow(sprite);
            }
        };
        Level.prototype.dragIt = function (sprite, pointer) {
            if (TProject.Boot.firstTimePlay) {
            }
            if (TProject.Boot.sfxEnable) {
                this._grabSound.play();
            }
            sprite.scaleUp();
            this._isSinglePlace = this._gameField.checkIfOnePlace(sprite);
        };
        Level.prototype.checkOverlap = function (fieldBlock, spriteB) {
            var boundsA = fieldBlock.getBounds();
            var fieldBlockBounds = new Phaser.Rectangle(boundsA.x + (boundsA.width / 4), boundsA.y + (boundsA.height / 4), boundsA.width / 4, boundsA.height / 4);
            var boundsB = spriteB.getBounds();
            return Phaser.Rectangle.intersects(fieldBlockBounds, boundsB);
        };
        Level.prototype.checkRank = function (startGame) {
            if (startGame === void 0) { startGame = false; }
            var prevRank = this._currentRank;
            while (this._gameScore >= TProject.Boot.gameConfig["medalsAchievesCount"][this._currentRank]) {
                if (this._currentRank == TProject.Boot.gameConfig["medalsAchievesCount"].length - 1) {
                    break;
                }
                this._currentRank++;
            }
            if (this._currentRank > prevRank) {
                this.changeMedal(startGame);
            }
            else if (this._currentRank == 0) {
                this._medalSprite.visible = false;
            }
            this._rankText.text = TProject.Boot.langConfig["medalNames"][this._currentRank] + "/" + TProject.Boot.gameConfig["medalsAchievesCount"][this._currentRank];
            if (this._currentRank != 0) {
                this._progressBarMask.scale.set(Math.min((this._gameScore - TProject.Boot.gameConfig["medalsAchievesCount"][this._currentRank - 1]) / (TProject.Boot.gameConfig["medalsAchievesCount"][this._currentRank] - TProject.Boot.gameConfig["medalsAchievesCount"][this._currentRank - 1])), 1);
            }
            else {
                this._progressBarMask.scale.set(Math.min(this._gameScore / TProject.Boot.gameConfig["medalsAchievesCount"][this._currentRank]), 1);
            }
        };
        Level.prototype.changeMedal = function (startGame) {
            this.game.tweens.removeFrom(this._medalSprite);
            if (startGame) {
                this._medalSprite.y = this._rankBack.y;
                this._medalSprite.visible = true;
                switch (this._currentRank) {
                    case 1:
                        this._medalSprite.frameName = "bronze";
                        break;
                    case 2:
                        this._medalSprite.frameName = "silver";
                        break;
                    case 3:
                        this._medalSprite.frameName = "gold";
                        break;
                    case 4:
                        this._medalSprite.frameName = "platin";
                        break;
                    case 5:
                        this._medalSprite.frameName = "diamond";
                        break;
                    case 6:
                        this._medalSprite.frameName = "champion";
                        break;
                    case 7:
                        this._medalSprite.frameName = "grandchampion";
                        break;
                }
            }
            else if (this._currentRank == 1) {
                if (TProject.Boot.sfxEnable) {
                    this._newMedalSound.play();
                }
                this._medalSprite.y = -100;
                this._medalSprite.visible = true;
                this._medalSprite.frameName = "bronze";
                this.game.time.events.add(400, this.emitMedalParticles, this);
                this.game.make.tween(this._medalSprite).to({ y: this._rankBack.y }, 2000, Phaser.Easing.Elastic.Out, true);
            }
            else {
                if (TProject.Boot.sfxEnable) {
                    this._newMedalSound.play();
                }
                this._medalSprite.visible = true;
                this.game.tweens.removeFrom(this._medalSprite);
                this.game.make.tween(this._medalSprite).to({ y: -100 }, 700, Phaser.Easing.Cubic.Out, true).onComplete.addOnce(function () {
                    switch (this._currentRank) {
                        case 1:
                            this._medalSprite.frameName = "bronze";
                            break;
                        case 2:
                            this._medalSprite.frameName = "silver";
                            break;
                        case 3:
                            this._medalSprite.frameName = "gold";
                            break;
                        case 4:
                            this._medalSprite.frameName = "platin";
                            break;
                        case 5:
                            this._medalSprite.frameName = "diamond";
                            break;
                        case 6:
                            this._medalSprite.frameName = "champion";
                            break;
                        case 7:
                            this._medalSprite.frameName = "grandchampion";
                            break;
                    }
                    this.game.time.events.add(400, this.emitMedalParticles, this);
                    this.game.make.tween(this._medalSprite).to({ y: this._rankBack.y }, 2000, Phaser.Easing.Elastic.Out, true);
                }, this);
            }
            console.log("medal changed");
        };
        Level.prototype.emitMedalParticles = function () {
            this._medalParticleEmmiter.explode(5000);
        };
        Level.prototype.createTopUI = function () {
            this._topBack = this.game.make.sprite(0, 0, "gameAssets", "topUI");
            this._topBack.anchor.set(0.5, 0);
            this._progressBar = this.game.make.sprite(-190, 60, "gameAssets", "topUIline");
            this._progressBar.anchor.set(0, 0.5);
            this._progressBarFill = this.game.make.sprite(this._progressBar.x + 2, this._progressBar.y, "gameAssets", "lineAnimation_00");
            this._progressBarFill.anchor.set(0, 0.5);
            this._progressBarFill.animations.add("idle", Phaser.Animation.generateFrameNames("lineAnimation_", 0, 10, "", 2), 18, true);
            this._progressBarFill.play("idle");
            this._progressBarMask = this.game.make.graphics(this._progressBarFill.x, this._progressBarFill.y - this._progressBarFill.height / 2);
            this._progressBarMask.beginFill(0xffffff);
            this._progressBarMask.drawRect(0, 0, this._progressBarFill.width, this._progressBarFill.height);
            this._progressBarFill.mask = this._progressBarMask;
            this._progressBarMask.scale.set(0, 1);
            this._rankBack = this.game.make.sprite(this._progressBar.x + this._progressBar.width + 30, this._progressBar.y, "gameAssets", "topUICircle");
            this._rankBack.anchor.set(0.5, 0.5);
            this._medalSprite = this.game.make.sprite(this._rankBack.x, this._progressBar.y, "gameAssets", "bronze");
            this._medalSprite.anchor.set(0.5, 0.5);
            this._medalSprite.visible = false;
            this._pauseButton = new TProject.UIButton(this.game, -260, 60, "pause", this.showPause.bind(this));
            this._pauseButton.showBtn(true);
            this._rankText = this.game.make.text(this._rankBack.x - this._rankBack.width / 2, this._rankBack.y - this._progressBar.height / 2, "", {
                font: "28px " + TProject.Boot.fontName,
                fill: "#FDEB9D"
            });
            this._rankText.anchor.set(1, 1);
            this._scoreDescriptionText = this.game.make.text(0, 190, TProject.Boot.langConfig["scoreText"], {
                font: "40px " + TProject.Boot.fontName,
                fill: "#FFDA4A"
            });
            this._scoreDescriptionText.anchor.set(0.5, 1);
            this._scoreText = this.game.make.text(0, this._scoreDescriptionText.y - this._scoreDescriptionText.height, "" + this._currScore, {
                font: "34px " + TProject.Boot.fontName,
                fill: "#FDEB9D"
            });
            this._scoreText.anchor.set(0.5, 1);

            // removed coin counter
            /* this._coinText = this.game.make.text(-260, 140, "" + TProject.Boot.currentMoney, {
                font: "35px " + TProject.Boot.fontName,
                fill: "#ffffff"
            });

            this._coinText.anchor.set(0.5, 1);
            var coinIcon = this.game.make.sprite(-260, this._coinText.y + 20, "gameAssets", "coin");
            coinIcon.anchor.set(0.5, 0.5); */


            this._giftIcon = this.game.make.sprite(240, 150, "gameAssets", "giftIcon");
            this._giftIcon.anchor.set(0.5, 0.5);
            this._giftIcon.inputEnabled = true;
            this._giftIcon.events.onInputUp.add(this.showBonusPopUp, this);
            this._giftNotification = this.game.make.sprite(this._giftIcon.x + this._giftIcon.width / 2 - 5, this._giftIcon.y - 10, "gameAssets", "giftPart");
            this._giftNotification.anchor.set(0.5, 0.5);
            this._giftIcon.visible = false;
            this._giftNotification.visible = false;
            this._boosterBack = this.game.make.sprite(-240, 150, "gameAssets", "boosterUI1");
            this._boosterBack.anchor.set(0.5, 0.5);
            this._boosterFill = this.game.make.sprite(this._boosterBack.x - this._boosterBack.width / 2, this._boosterBack.y + this._boosterBack.height / 2, "gameAssets", "boosterUI2");
            this._boosterFill.anchor.set(0, 1);
            this._boosterMask = this.game.make.graphics(this._boosterFill.x, this._boosterFill.y);
            this._boosterMask.beginFill(0xffffff);
            this._boosterMask.drawRect(0, 0, this._boosterFill.width, this._boosterFill.height);
            this._boosterFill.mask = this._boosterMask;
            this._boosterMask.scale.set(1, -1);
            this._boosterBack.visible = false;
            this._boosterFill.visible = false;
            this._boosterMask.visible = false;
            this._popUpAchieveBack = this.game.make.sprite(0, -200, "gameAssets", "popupPanel");
            this._popUpAchieveBack.anchor.set(0.5, 0.5);
            this._popUpAchieveIcon = this.game.make.sprite(144, -7, "gameAssets", "achievmentIcon");
            this._popUpAchieveIcon.anchor.set(0.5, 0.5);
            this._popUpAchieveIcon.scale.set(0.8, 0.8);
            if (!(this.game.renderer.type == Phaser.CANVAS)) {
                this._popUpAchieveDescription = this.game.make.sprite(-50, 17, "menuTextAtlas", "medal1");
            }
            else {
                this._popUpAchieveDescription = this.game.make.text(-50, 17, "", {
                    font: "24px " + TProject.Boot.fontName,
                    fill: "#ffffff"
                });
            }
            this._popUpAchieveDescription.anchor.set(0.5, 0.5);
            this._popUpAchieveInfoText = this.game.make.text(-50, -28, TProject.Boot.langConfig["newAchieveText"], {
                font: "24px " + TProject.Boot.fontName,
                fill: "#ffffff"
            });
            this._popUpAchieveInfoText.anchor.set(0.5, 0.5);
            this._popUpAchieveBack.addChild(this._popUpAchieveIcon);
            this._popUpAchieveBack.addChild(this._popUpAchieveDescription);
            this._popUpAchieveBack.addChild(this._popUpAchieveInfoText);
            this._popUpAchieveBack.visible = false;
            this._topPanels = this.game.add.group();
            this._topPanels.add(this._topBack);
            this._topPanels.add(this._rankText);
            this._topPanels.add(this._scoreText);

            /* this._topPanels.add(this._coinText);
            this._topPanels.add(coinIcon); */

            this._topPanels.add(this._scoreDescriptionText);
            this._topPanels.add(this._progressBar);
            this._topPanels.add(this._progressBarFill);
            this._topPanels.add(this._progressBarMask);
            this._topPanels.add(this._rankBack);
            this._topPanels.add(this._medalSprite);
            this._topPanels.add(this._pauseButton);
            this._topPanels.add(this._giftIcon);
            this._topPanels.add(this._giftNotification);
            this._topPanels.add(this._boosterBack);
            this._topPanels.add(this._boosterFill);
            this._topPanels.add(this._boosterMask);
            this._topPanels.add(this._popUpAchieveBack);
            this.hideGift();
            this.checkRank(true);
            this._medalParticleEmmiter = this.game.make.emitter(0, 0, 60);
            this._medalParticleEmmiter.makeParticles("gameAssets", "particleStar");
            this._medalParticleEmmiter.setXSpeed(-350, 200);
            this._medalParticleEmmiter.setYSpeed(-200, 150);
            this._medalParticleEmmiter.minParticleScale = 0.4;
            this._medalParticleEmmiter.maxParticleScale = 1;
            this._medalParticleEmmiter.gravity.set(0, 250);
            this._medalParticleEmmiter.particleAnchor.set(0.5, 0.5);
        };
        Level.prototype.updateBoosterState = function (appear) {
            if (appear === void 0) { appear = false; }
            if (this._giftIcon.visible) {
                this._giftTimeToHide--;
                if (this._giftTimeToHide <= 0) {
                    this.hideGift();
                }
            }
            else {
                this._giftTimeToShow--;
                if (this._giftTimeToShow <= 0) {
                    this.showGift();
                }
            }
            if (appear) {
                this._boosterBack.visible = true;
                this._boosterBack.frameName = "boosterUI1";
                this._boosterFill.visible = true;
                this._boosterMask.visible = true;
                this._boosterMask.scale.set(1, -1);
            }
            else if (this._boosterStep > 0) {
                this._boosterStep--;
                if (this._currentBoosterType == 0) {
                    this._boosterMask.scale.set(1, -this._boosterStep / 3);
                }
                else {
                    this._boosterMask.scale.set(1, -this._boosterStep / 10);
                }
                if (this._boosterStep == 0) {
                    this._boosterBack.visible = false;
                    this._boosterFill.visible = false;
                    this._boosterMask.visible = false;
                    this._boosterPointsMultiplier = 1;
                    this._boosterComboMultiplier = 1;
                    this._boosterComboDelay = 0;
                }
            }
        };
        Level.prototype.shakeGift = function () {
            this.game.add.tween(this._giftIcon.scale).to({ x: 1.2, y: 1.2 }, 500, Phaser.Easing.Bounce.Out, true, 0, 2, true);
        };
        Level.prototype.showGift = function () {
            this._currentBoosterType = Math.floor(Math.random() * 3);
            this._bonusDescription.text = TProject.Boot.langConfig["boosterDescriptions"][this._currentBoosterType];
            this._giftTimeToHide = 3;
            this._giftIcon.visible = true;
            this._giftIcon.position.y = 50;
            this._giftIcon.alpha = 0.5;
            this._giftIcon.scale.set(1, 1);
            this.game.add.tween(this._giftIcon).to({ x: 240, y: 150, alpha: 1 }, 400, Phaser.Easing.Bounce.Out, true);
            this.game.time.events.add(400, function () {
                this._giftNotification.visible = true;
                this._giftShakeTimer.start();
            }, this);
        };
        Level.prototype.hideGift = function () {
            this._giftTimeToShow = Phaser.Math.between(7, 13);
            this.game.tweens.removeFrom(this._giftIcon.scale);
            this._giftShakeTimer.stop(false);
            this.game.add.tween(this._giftIcon.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Cubic.In, true).onComplete.addOnce(function () {
                this._giftIcon.visible = false;
            }, this);
            this._giftNotification.visible = false;
        };
        Level.prototype.createBottomUI = function () {
            this._bottomBack = this.game.make.sprite(0, 0, "gameAssets", "botUI");
            this._bottomBack.anchor.set(0.5, 1);
            this._midPanel = this.game.make.sprite(0, 0, "gameAssets", "bigSquareBottom");
            this._midPanel.anchor.set(0.5, 0.5);
            this._midPanel.position.set(0, -20 - this._midPanel.height / 2);
            this._leftPanel = this.game.make.sprite(0, 0, "gameAssets", "bigSquareBottom");
            this._leftPanel.anchor.set(0.5, 0.5);
            this._leftPanel.position.set(-200, -20 - this._midPanel.height / 2);
            this._rightPanel = this.game.make.sprite(0, 0, "gameAssets", "bigSquareBottom");
            this._rightPanel.anchor.set(0.5, 0.5);
            this._rightPanel.position.set(200, -20 - this._midPanel.height / 2);
            this._bottomPanels = this.game.add.group();
            this._bottomPanels.add(this._bottomBack);
            this._bottomPanels.add(this._midPanel);
            this._bottomPanels.add(this._leftPanel);
            this._bottomPanels.add(this._rightPanel);
            if (this.game.device.desktop || this.game.scale.isLandscape) {
                this._bottomBack.visible = false;
                this._leftPanel.position.set(0, -200);
                this._midPanel.position.set(0, 0);
                this._rightPanel.position.set(0, 200);
            }
            else {
                this._bottomBack.visible = true;
                this._leftPanel.position.set(-200, -20 - this._midPanel.height / 2);
                this._midPanel.position.set(0, -20 - this._midPanel.height / 2);
                this._rightPanel.position.set(200, -20 - this._midPanel.height / 2);
            }
        };
        Level.prototype.createField = function () {
            this._gameField = new TProject.GameField(this.game, 0, 0);
            this.game.add.existing(this._gameField);
            if (this._prevSessionExist) {
                this._gameField.loadExistingField();
            }
        };
        Level.prototype.createMoodUp = function () {
            this._comboParticleEmmiter = this.game.make.emitter(0, 0, 500);
            this._comboParticleEmmiter.makeParticles("gameAssets", "particleStar");
            this._comboParticleEmmiter.setXSpeed(-300, 300);
            this._comboParticleEmmiter.setYSpeed(-300, 300);
            this._comboParticleEmmiter.minParticleScale = 0.4;
            this._comboParticleEmmiter.maxParticleScale = 1;
            this._comboParticleEmmiter.particleAnchor.set(0.5, 0.5);
            this._moodUpGroup = this.game.add.group();
            this._moodUpBack = this.game.make.sprite(0, 0, "gameAssets", "lightRay");
            this._moodUpBack.anchor.set(0.5, 0.5);
            this._moodUpText1 = this.game.make.text(0, 0, "", {
                font: "90px " + TProject.Boot.fontName,
                fill: "#ffffff"
            });
            this._moodUpText1.anchor.set(0.5, 0.5);
            this._moodUpText2 = this.game.make.text(0, 0, "", {
                font: "90px " + TProject.Boot.fontName,
                fill: "#ffd040"
            });
            this._moodUpText2.anchor.set(0.5, 0.5);
            this._moodUpContainer = this.game.make.sprite(0, 0, "gameAssets", "emptySprite");
            this._moodUpContainer.anchor.set(0.5, 0.5);
            this._moodUpContainer.angle = -15;
            this._moodUpBack.visible = false;
            this._moodUpContainer.visible = false;
            this._moodUpContainer.addChild(this._moodUpText1);
            this._moodUpContainer.addChild(this._moodUpText2);
            this._tutorialTextContainer = this.game.make.sprite(0, 0);
            this._tutorialTextContainer.anchor.set(0.5, 0.5);
            this._tutorialTextBack = this.game.make.sprite(0, 0, "gameAssets", "ftePanel");
            this._tutorialTextBack.anchor.set(0.5, 0.5);
            this._tutorialHeaderText = this.game.make.text(0, -this._tutorialTextBack.height / 2 + 25, "header", {
                font: "40px " + TProject.Boot.fontName,
                fill: "#0e0e0e"
            });
            this._tutorialHeaderText.anchor.set(0.5, 0.5);
            this._tutorialDescriptionText = this.game.make.text(0, 10, "", {
                font: "25px " + TProject.Boot.fontName,
                fill: "#0e0e0e",
                wordWrap: true,
                wordWrapWidth: 420
            });
            this._tutorialDescriptionText.anchor.set(0.5, 0.5);
            this._tutorialTextContainer.addChild(this._tutorialTextBack);
            this._tutorialTextContainer.addChild(this._tutorialHeaderText);
            this._tutorialTextContainer.addChild(this._tutorialDescriptionText);
            this._tutorialTextContainer.visible = false;
            this._moodUpGroup.add(this._tutorialTextContainer);
            this._moodUpGroup.add(this._moodUpBack);
            this._moodUpGroup.add(this._moodUpContainer);
        };
        Level.prototype.overThisTry = function () {
            this.resetCombo();
            this._gameField.clearField();
            if (this._leftBlock != null) {
                this._blocksGroup.remove(this._leftBlock);
                this._leftBlock.events.onDragStart.removeAll(this);
                this._leftBlock.events.onDragUpdate.removeAll(this);
                this._leftBlock.events.onDragStop.removeAll(this);
                this._leftBlock.destroy();
                this._leftBlock = null;
            }
            if (this._midBlock != null) {
                this._blocksGroup.remove(this._midBlock);
                this._midBlock.events.onDragStart.removeAll(this);
                this._midBlock.events.onDragUpdate.removeAll(this);
                this._midBlock.events.onDragStop.removeAll(this);
                this._midBlock.destroy();
                this._midBlock = null;
            }
            if (this._rightBlock != null) {
                this._blocksGroup.remove(this._rightBlock);
                this._rightBlock.events.onDragStart.removeAll(this);
                this._rightBlock.events.onDragUpdate.removeAll(this);
                this._rightBlock.events.onDragStop.removeAll(this);
                this._rightBlock.destroy();
                this._rightBlock = null;
            }

            this.game.time.events.add(1000, this.showOverPopUp, this);


        };
        Level.prototype.shakeExistingBlocks = function () {
            if (this._leftBlock != null) {
                this.game.add.tween(this._leftBlock).to({ x: this._leftBlock.x + 10 }, 100, Phaser.Easing.Linear.None, true, 0, 6, true);
            }
            if (this._midBlock != null) {
                this.game.add.tween(this._midBlock).to({ x: this._midBlock.x + 10 }, 100, Phaser.Easing.Linear.None, true, 0, 6, true);
            }
            if (this._rightBlock != null) {
                this.game.add.tween(this._rightBlock).to({ x: this._rightBlock.x + 10 }, 100, Phaser.Easing.Linear.None, true, 0, 6, true);
            }
        };
        Level.prototype.showNoMoreMoves = function () {
            var _this = this;
            this.shakeExistingBlocks();
            this._overBlackScreen.alpha = 0;
            this._overBlackScreen.visible = true;
            this._noMoreMovesBack.visible = true;
            this._noMoreMovesBack.y = this.game.height / this._overGroup.scale.y;
            this.game.add.tween(this._noMoreMovesBack).to({ y: 0 }, 500, Phaser.Easing.Sinusoidal.InOut, true, 1000).onComplete.addOnce(function () {
                _this.game.add.tween(_this._noMoreMovesBack).to({ y: -_this.game.height / _this._overGroup.scale.y }, 500, Phaser.Easing.Sinusoidal.InOut, true, 3000).onComplete.addOnce(function () {
                    _this._noMoreMovesBack.visible = false;
                    if (_this._canBeContinued) {
                        _this.showContinuePopUp();
                    }
                    else {
                        _this.overThisTry();
                    }
                }, _this);
            }, this);
        };
        Level.prototype.showContinuePopUp = function () {
            this._overBlackScreen.alpha = 0;
            this._overBlackScreen.visible = true;
            this._overRedScreen.alpha = 0.5;
            this._overRedScreen.visible = true;
            this.game.add.tween(this._overBlackScreen).to({ alpha: 0.75 }, 400, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this._overRedScreen).to({ alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true, 0, -1, true);

            console.log('currentMoney: '+TProject.Boot.currentMoney+', adContinuePrice: '+TProject.Boot.gameConfig["adContinuePrice"]);
            this._continuePopUp.show(400);
            this._continuePopUp.checkIsEnoughMoney();
            this._continuePopUp.position.set(0, 1440);
            this.game.add.tween(this._continuePopUp).to({ y: 0 }, 400, Phaser.Easing.Cubic.Out, true);
            this._canBeContinued = false;
        };
        Level.prototype.hideContinuePopUp = function (toOver) {
            if (toOver === void 0) { toOver = true; }
            this.game.tweens.removeFrom(this._overRedScreen);
            this.game.add.tween(this._overBlackScreen).to({ alpha: 0 }, 400, Phaser.Easing.Cubic.Out, true).onComplete.addOnce(function () {
                this._overBlackScreen.visible = false;
                this._overRedScreen.visible = false;
            }, this);
            this.game.add.tween(this._continuePopUp).to({ y: -1440 }, 400, Phaser.Easing.Cubic.Out, true);
            if (toOver) {
                this.game.time.events.add(400, this.overThisTry, this);
            }
            else {
                this._gameField.clearToContinue();
                this.checkBlocks();
            }
        };
        Level.prototype.hideAllGameText = function () {
            this._rankText.visible = false;
            this._scoreText.visible = false;
            this._gameField.visible = false;
        };
        Level.prototype.showAllGameText = function () {
            this._rankText.visible = true;
            this._scoreText.visible = true;
            this._gameField.visible = true;
        };
        Level.prototype.showOverPopUp = function () {
            /* sdkHandler.trigger("playButtonPressed", { callback: function () { */
                if (TProject.Boot.sfxEnable) {
                    this._loseSound.play();
                }
                this.hideAllGameText();
                this._overBlackScreen.alpha = 0;
                this._overBlackScreen.visible = true;
                this.game.add.tween(this._overBlackScreen).to({ alpha: 0.75 }, 400, Phaser.Easing.Cubic.Out, true);
                this._overPopUp.show(400);
                this._overPopUp.position.set(0, 1440);
                this.game.add.tween(this._overPopUp).to({ y: 0 }, 400, Phaser.Easing.Cubic.Out, true);
                this._overPopUp.showNewAchieves();
                this._gameScore = 0;
                this._currentRank = 0;
                this.setScore(0);
                this.checkRank();
                TProject.Boot.totalPoints = this._gameScore;
                this.saveGame();
            /* }}, this); */
        };
        Level.prototype.removeExistingBlocks = function (sprite) {
            this.game.tweens.removeFrom(sprite);
            this._blocksGroup.remove(sprite);
            sprite.events.onDragStart.removeAll(this);
            sprite.events.onDragUpdate.removeAll(this);
            sprite.events.onDragStop.removeAll(this);
            sprite.destroy();
            if (sprite == this._leftBlock) {
                this._leftBlock = null;
            }
            else if (sprite == this._midBlock) {
                this._midBlock = null;
            }
            else if (sprite == this._rightBlock) {
                this._rightBlock = null;
            }
        };
        Level.prototype.restartLevel = function () {
            sdkHandler.trigger('playButtonPressed', {
                callback: () => {
                    console.log("--fx--playButtonPressed--");
                    this.showAllGameText();
                    this._overBlackScreen.visible = false;
                    this._overPopUp.visible = false;
                    this.hideGift();
                    this._boosterStep = 1;
                    this.updateBoosterState();
                    this._gameField.clearField();
                    this.hidePause();
                    this.resetBlocks();
                    this.resetCombo();
                    this._gameScore = 0;
                    this._currentRank = 0;
                    TProject.Boot.totalPoints = this._gameScore;
                    this.setScore(0);
                    this._canBeContinued = true;
                    this.checkRank();
                    this.saveGame();
                    sdkHandler.trigger("gameStart");
                }
            }, this)
        };
        Level.prototype.saveGame = function () {
            this._gameField.saveCurrentField();
            TProject.Boot.saveTheGame();
        };
        Level.prototype.resize = function () {

            var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const userAgent = navigator.userAgent.toLowerCase();
            var isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);

            var wR = this.game.width / (640 * 1.8);
            var hR = this.game.height / 960;
            var scaleFactor = Math.min(wR, hR);


            if (isMobile) {
                scaleFactor = this.game.width / 640;
                console.log("isMobile");
            }
            if (isTablet) {
                scaleFactor = this.game.width / (640 * 1.5);
                console.log("isTablet")
            }
            var ratio = window.innerWidth / window.innerHeight;
            if (ratio > 0.95 && ratio < 1.1) { // galaxy fold
                scaleFactor = this.game.width / (640 * 1.5);
            }

            this._background.width = this.game.width;
            this._background.height = this.game.height;
            this._overBlackScreen.width = this.game.width;
            this._overBlackScreen.height = this.game.height;
            this._popupBlackScreen.width = this.game.width;
            this._popupBlackScreen.height = this.game.height;
            this._moodUpGroup.scale.set(scaleFactor);
            this._moodUpGroup.position.set(this.game.width / 2, this.game.height / 2);
            this._topPanels.scale.set(scaleFactor);
            this._topPanels.position.set(this.game.width / 2, 0);
            this._topBack.width = this.game.width / scaleFactor;
            if (this.game.device.desktop || this.game.scale.isLandscape) {
                this._bottomBack.visible = false;
                this._leftPanel.position.set(0, -200);
                this._midPanel.position.set(0, 0);
                this._rightPanel.position.set(0, 200);
            }
            else {
                this._bottomBack.visible = true;
                this._leftPanel.position.set(-200, -20 - this._midPanel.height / 2);
                this._midPanel.position.set(0, -20 - this._midPanel.height / 2);
                this._rightPanel.position.set(200, -20 - this._midPanel.height / 2);
            }
            if (this._leftBlock != null) {
                this.game.tweens.removeFrom(this._leftBlock);
                this._leftBlock.position.set(this._leftPanel.x, this._leftPanel.y);
            }
            if (this._midBlock != null) {
                this.game.tweens.removeFrom(this._midBlock);
                this._midBlock.position.set(this._midPanel.x, this._midPanel.y);
            }
            if (this._rightBlock != null) {
                this.game.tweens.removeFrom(this._rightBlock);
                this._rightBlock.position.set(this._rightPanel.x, this._rightPanel.y);
            }
            if (this.game.device.desktop || this.game.scale.isLandscape) {
                this._gameField.scale.set(scaleFactor * 1.2);
                this._gameField.position.set(this.game.width / 2, this.game.height / 2 + (192 * scaleFactor * 1.2 / 2));
                this._bottomPanels.scale.set(scaleFactor * 1.2);
                this._bottomPanels.position.set(this.game.width / 2 + (400 * scaleFactor * 1.2), this._gameField.y);
                this._blocksGroup.scale.set(scaleFactor * 1.2);
                this._blocksGroup.position.set(this._bottomPanels.x, this._gameField.y);
            }
            else {
                this._gameField.scale.set(scaleFactor);
                this._gameField.position.set(this.game.width / 2, this.game.height / 2);
                this._bottomPanels.scale.set(scaleFactor);
                this._bottomPanels.position.set(this.game.width / 2, this.game.height);
                this._bottomBack.width = this.game.width / scaleFactor;
                this._blocksGroup.scale.set(scaleFactor);
                this._blocksGroup.position.set(this.game.width / 2, this.game.height);
            }
            this._overGroup.scale.set(scaleFactor);
            this._overGroup.position.set(this.game.width / 2, this.game.height / 2);
            this._overRedScreen.height = this.game.height * 1.096 * (1 / scaleFactor);
            this._medalParticleEmmiter.emitX = this._rankBack.x * scaleFactor + this.game.width / 2;
            this._medalParticleEmmiter.emitY = this._rankBack.y;
            this._medalParticleEmmiter.minParticleScale = 0.4 * scaleFactor;
            this._medalParticleEmmiter.maxParticleScale = scaleFactor;
            this._comboParticleEmmiter.emitX = this.game.width / 2;
            this._comboParticleEmmiter.emitY = this.game.height / 2;
            this._comboParticleEmmiter.minParticleScale = 0.4 * scaleFactor;
            this._comboParticleEmmiter.maxParticleScale = scaleFactor;
            this._popUpGroup.scale.set(scaleFactor);
            this._popUpGroup.position.set(this.game.width / 2, this.game.height / 2);
            this._pauseGroup.scale.set(scaleFactor);
            this._pauseGroup.position.set(this.game.width / 2, this.game.height / 2);
            this._closeBtn.position.set(-this._rankBack.x, -this.game.height / 2 / scaleFactor + this._closeBtn.height);
        };
        Level.POINTMULT = 0;
        Level.COMBOSCORE = 1;
        Level.COMBODURATION = 2;
        return Level;
    }(Phaser.State));
    TProject.Level = Level;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            var _this = _super.call(this) || this;
            _this._loadedAssets = false;
            _this._loadedFont = false;
            _this._soundsArray = ["main_theme", "grab_figure", "insert_figure", "line_combo_1", "line_combo_2", "line_combo_3", "lose", "new_medal"];
            return _this;
        }
        Preloader.prototype.preload = function () {
            this._loadingGreySprite = this.game.add.sprite(this.game.width / 2, this.game.height / 2, "loadingIconGrey");
            this._loadingGoldSprite = this.game.add.sprite(this.game.width / 2, this.game.height / 2, "loadingIconGold");
            this._loadingGreySprite.anchor.set(0.5, 0.5);
            this._loadingGoldSprite.anchor.set(0.5, 0.5);
            this._loadingGoldSpriteMask = this.game.add.graphics(this.game.width / 2 - this._loadingGoldSprite.width / 2, this.game.height / 2 + this._loadingGoldSprite.height / 2);
            this._loadingGoldSpriteMask.beginFill(0xffffff);
            this._loadingGoldSpriteMask.drawRect(0, 0, this._loadingGoldSprite.width, this._loadingGoldSprite.height);
            this._loadingGoldSprite.mask = this._loadingGoldSpriteMask;
            this._loadingGoldSpriteMask.scale.set(1, 0);
            this.resize();
            this.game.scale.refresh();
            this._loadedFont = true;
            this._loadedAssets = true;
            this.game.load.crossOrigin = "anonymous";
            this.loading();
            this.load.onFileComplete.add(this.onLoadProgress, this);
            this.resize();
        };
        Preloader.prototype.onLoadProgress = function (progress, cacheKey) {
            sdkHandler.trigger("loading.update", {
                progressPercentage: progress
            });
            this._loadingGoldSpriteMask.scale.set(1, -Math.floor(progress) / 100);
            if (progress >= 100) {
                this.load.onFileComplete.remove(this.onLoadProgress, this);
                this._loadedAssets = true;
                TProject.Boot.langConfig = JSON.parse(this.game.cache.getText("lang"));
                TProject.Boot.langConfig = TProject.Boot.langConfig[TProject.Boot.defLang];
            }
        };
        Preloader.prototype.resize = function () {
            var scaleFactor = this.game.height / 960;
            if (this.game.width / this.game.height <= 2 / 3) {
                scaleFactor = this.game.width / 640;
            }
            this._loadingGoldSprite.scale.setTo(scaleFactor, scaleFactor);
            this._loadingGreySprite.scale.setTo(scaleFactor, scaleFactor);
            this._loadingGoldSprite.position.set(this.game.width / 2, this.game.height / 2);
            this._loadingGreySprite.position.set(this.game.width / 2, this.game.height / 2);
            this._loadingGoldSpriteMask.clear();
            this._loadingGoldSpriteMask.beginFill(0xffffff);
            this._loadingGoldSpriteMask.drawRect(0, 0, this._loadingGoldSprite.width, this._loadingGoldSprite.height);
            this._loadingGoldSpriteMask.position.set(this.game.width / 2 - this._loadingGoldSprite.width / 2, this.game.height / 2 + this._loadingGoldSprite.height / 2);
        };
        Preloader.prototype.loading = function () {
            this.loadAtlases(["gameAssets"]);
            this.loadFonts(["" + TProject.Boot.fontName]);
            this.loadSettings(["lang"]);
            this.loadSounds(this._soundsArray);
        };
        Object.defineProperty(Preloader.prototype, "isAllSoundsDecoded", {
            get: function () {
                var allDecoded;
                for (var i = 0; i < this._soundsArray.length; i++) {
                    if (!this.cache.isSoundDecoded(this._soundsArray[i])) {
                        return false;
                    }
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Preloader.prototype.update = function () {
            if (this._loadedAssets && this._loadedFont && this.isAllSoundsDecoded) {
                sdkHandler.trigger("loading.completed", {});
                this._loadedAssets = false;
                if (localStorage.getItem("firstTime") == null) {
                    TProject.Boot.firstTimePlay = true;
                }
                else {
                    TProject.Boot.loadTheGame();
                }
                setTimeout(function () {
                }, 400);
            }
        };
        Preloader.prototype.loadSounds = function (names) {
            if (names == null || names.length == 0) {
                return;
            }
            for (var i = 0; i < names.length; i++) {
                this.game.load.audio(names[i], [TProject.Boot.PATH_SOUNDS + names[i] + ".ogg", TProject.Boot.PATH_SOUNDS + names[i] + ".mp3"], true);
            }
        };
        Preloader.prototype.loadFonts = function (fonts, stylename, cb) {
            var _this = this;
            if (stylename === void 0) { stylename = "styles"; }
            if (fonts == null || fonts.length == 0) {
                return;
            }
            this._loadedFont = false;
            TProject.System.loadFonts(fonts, stylename + ".css", function () {
                _this._loadedFont = true;
                if (cb) {
                    cb();
                }
            });
        };
        Preloader.prototype.loadAtlases = function (names, format) {
            if (format === void 0) { format = "png"; }
            if (names == null || names.length == 0) {
                return;
            }
            var version = "?v=12";
            var arr;
            for (var i = 0; i < names.length; i++) {
                var name_1 = names[i].split("/").pop();
                var namepath = TProject.Boot.PATH_IMAGES + names[i];
                this.game.load.atlas(name_1, namepath + "." + format + version, namepath + ".json" + version, null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
            }
            this._loadedAssets = false;
        };
        Preloader.prototype.loadSettings = function (names, format) {
            if (format === void 0) { format = "json"; }
            if (names == null || names.length == 0) {
                return;
            }
            var version = "?v=3";
            var arr;
            for (var i = 0; i < names.length; i++) {
                var name_2 = names[i].split("/").pop();
                var namepath = TProject.Boot.PATH_SETTINGS + names[i];
                this.game.load.text(name_2, namepath + "." + format + version);
            }
        };
        Preloader.prototype.loadImages = function (names, format) {
            if (format === void 0) { format = "png"; }
            if (names == null || names.length == 0) {
                return;
            }
            var arr;
            for (var i = 0; i < names.length; i++) {
                var name_3 = names[i].split("/").pop();
                var namepath = TProject.Boot.PATH_IMAGES + names[i];
                this.game.load.image(name_3, namepath + "." + format);
            }
            this._loadedAssets = false;
        };
        Preloader.prototype.loadImagesFromSite = function (names, format, siteLink) {
            if (names == null || names.length == 0) {
                return;
            }
            var arr;
            for (var i = 0; i < names.length; i++) {
                var name_4 = names[i].split("/").pop();
                var namepath = siteLink + names[i];
                this.game.load.image(name_4, namepath + "." + format);
            }
            this._loadedAssets = false;
        };
        return Preloader;
    }(Phaser.State));
    TProject.Preloader = Preloader;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var System = (function () {
        function System() {
        }
        System.loadFonts = function (fonts, fileName, cb) {
            WebFont.load({
                custom: {
                    families: fonts,
                    urls: [
                        TProject.Boot.PATH_FONTS + fileName
                    ]
                },
                active: function () {
                    window.setTimeout(function () {
                        if (cb != null) {
                            cb();
                        }
                    }, 100);
                }
            });
        };
        return System;
    }());
    TProject.System = System;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var ContinuePopUp = (function (_super) {
        __extends(ContinuePopUp, _super);
        function ContinuePopUp(game, x, y) {
            var _this = _super.call(this, game, x, y, "gameAssets", "continuePanel") || this;
            _this.anchor.set(0.5, 0.5);
            _this._cntdwn = 7;
            _this.init();
            return _this;
        }
        ContinuePopUp.prototype.countDown = function () {
            this._cntdwn--;
            this._countDownText.text = this._cntdwn + "";
            if (this._cntdwn == 0) {
                this._cntdwn = 7;
                this._countDownTimer.stop(false);
                TProject.GameEvent.continueSignal.dispatch("deny");
            }
        };
        ContinuePopUp.prototype.init = function () {
            this._countDownTimer = this.game.time.create(false);
            this._countDownTimer.loop(1000, this.countDown, this);
            this._countDownText = this.game.make.text(0, -20, "" + this._cntdwn, {
                font: "96px " + TProject.Boot.fontName,
                fill: "#555555"
            });
            this._countDownText.anchor.set(0.5, 0.5);
            this._continueText = this.game.make.text(0, -this.height / 2 + 20, TProject.Boot.langConfig["continueText"], {
                font: "43px " + TProject.Boot.fontName,
                fill: "#555555"
            });
            this._continueText.anchor.set(0.5, 0);
            this.initPurchaseBtn();
            this.addChild(this._continueText);
            this.addChild(this._countDownText);
            this.addChild(this._purchaseBtn);
        };
        ContinuePopUp.prototype.initPurchaseBtn = function () {
            var adEnable = TProject.Boot.gameConfig["adEnabled"];
            this._purchaseBtn = this.game.make.sprite(0, this.height / 2 - 80, "gameAssets", "greenButtonGift");
            this._purchaseBtn.anchor.set(0.5, 0.5);
            this._purchaseBtn.inputEnabled = true;
            var purchText = this.game.make.text(this._purchaseBtn.width / 6, 0, TProject.Boot.langConfig["watchText"], {
                font: "40px " + TProject.Boot.fontName,
                fill: "#FFFFFF"
            });
            var i = 1;
            while (purchText.width > 180) {
                purchText.fontSize = 48 - i;
                i += 1;
            }
            purchText.anchor.set(0.5, 0.5);
            this._purchaseBtn.addChild(purchText);
            if (adEnable) {
                this._purchaseBtn.events.onInputUp.add(function () {
                    this._countDownTimer.stop(false);
                    this.showAd();
                }, this);
                var adIcon = this.game.make.sprite(-this._purchaseBtn.width / 2 + 10, 0, "gameAssets", "videoIconSmall");
                adIcon.anchor.set(0, 0.5);
                this._purchaseBtn.addChild(adIcon);
            }
            else {
                purchText.text = TProject.Boot.langConfig["purchaseText"];
                this._purchaseBtn.events.onInputUp.add(function () {
                    this._countDownTimer.stop(false);
                    TProject.Boot.currentMoney -= TProject.Boot.gameConfig["adContinuePrice"];
                    TProject.Boot.totalContinuedGames++;
                    TProject.GameEvent.continueSignal.dispatch("accept");
                }, this);
                var coinIcon = this.game.make.sprite(-this._purchaseBtn.width / 2 + 30, 0, "gameAssets", "coin");
                coinIcon.anchor.set(0.5, 0.5);
                this._purchaseBtnCoinText = this.game.make.text(coinIcon.x + coinIcon.width / 2, 0, TProject.Boot.gameConfig["adContinuePrice"] + "", {
                    font: "25px " + TProject.Boot.fontName,
                    fill: "#FFFFFF"
                });
                this._purchaseBtnCoinText.anchor.set(0, 0.5);
                this._purchaseBtn.addChild(coinIcon);
                this._purchaseBtn.addChild(this._purchaseBtnCoinText);
                this.checkIsEnoughMoney();
            }
        };
        ContinuePopUp.prototype.showAd = function () {
            this.game.paused = true;
            this.game.sound.mute = true;
            sdkHandler.trigger('rewardedAd', {
                callback: (success) => {
                    this.game.paused = false;
                    this.game.sound.mute = false;
                    if (success) {
                        TProject.Boot.totalContinuedGames++;
                        TProject.GameEvent.continueSignal.dispatch("accept");
                    }
                    else {
                        this._cntdwn = 0;
                        this.countDown();
                    }
                }
            }, this);
            if (TProject.Boot.gameConfig["withoutAdSDKCallback"]) {
                this.game.paused = false;
                this.game.sound.mute = false;
                TProject.Boot.totalContinuedGames++;
                TProject.GameEvent.continueSignal.dispatch("accept");
            }
        };
        ContinuePopUp.prototype.checkIsEnoughMoney = function () {
            if (TProject.Boot.currentMoney >= TProject.Boot.gameConfig["adContinuePrice"]) {
                this._purchaseBtn.inputEnabled = true;
                this._purchaseBtn.frameName = "greenButtonGift";
                this._purchaseBtnCoinText.fill = "#ffffff";
            }
            else {
                this._purchaseBtn.inputEnabled = false;
                this._purchaseBtn.frameName = "greyButtonGift";
                this._purchaseBtnCoinText.fill = "#f44336";
            }
        };
        ContinuePopUp.prototype.show = function (countDelay) {
            this.visible = true;
            this._cntdwn = 7;
            this._countDownText.text = this._cntdwn + "";
            this._countDownTimer.start();
        };
        return ContinuePopUp;
    }(Phaser.Sprite));
    TProject.ContinuePopUp = ContinuePopUp;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var FieldBlock = (function (_super) {
        __extends(FieldBlock, _super);
        function FieldBlock(game, x, y, id, parent, blockGroup) {
            var _this = _super.call(this, game, x, y, "gameAssets", "fieldPiece") || this;
            _this._currColor = "1";
            if (parent) {
                parent.addChild(_this);
            }
            _this._id = id;
            _this._blockGroup = blockGroup;
            _this._empty = true;
            _this._filledBlock = _this.game.make.sprite(25 + _this.x, 25 + _this.y, "gameAssets", FieldBlock.CYAN);
            _this._filledBlock.anchor.set(0.5, 0.5);
            _this._hintBlock = _this.game.make.sprite(25 + _this.x, 25 + _this.y, "gameAssets", FieldBlock.CYAN + "h");
            _this._hintBlock.anchor.set(0.5, 0.5);
            _this._hintBlock.alpha = 0.5;
            _this._hinted = false;
            _this.events.onInputUp.add(_this.changeState, _this);
            return _this;
        }
        Object.defineProperty(FieldBlock.prototype, "isFilled", {
            get: function () { return !this._empty; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FieldBlock.prototype, "isHinted", {
            get: function () { return this._hinted; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FieldBlock.prototype, "currColor", {
            get: function () { return this._currColor; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FieldBlock.prototype, "id", {
            get: function () { return this._id; },
            enumerable: true,
            configurable: true
        });
        FieldBlock.prototype.changeState = function () {
            if (this._empty) {
                this.appear(FieldBlock.YELLOW);
            }
            else {
                this.disappear();
            }
            TProject.GameEvent.fieldChanged.dispatch();
        };
        FieldBlock.prototype.hint = function (color, withTween) {
            if (withTween === void 0) { withTween = true; }
            this._blockGroup.add(this._hintBlock);
            this._hintBlock.frameName = color + "h";
            this.game.tweens.removeFrom(this._hintBlock.scale);
            if (withTween) {
                this._hintBlock.scale.set(0, 0);
                this.game.add.tween(this._hintBlock.scale).to({ x: 1, y: 1 }, 400, Phaser.Easing.Cubic.Out, true);
            }
            else {
                this._hintBlock.scale.set(1, 1);
            }
            this._hinted = true;
        };
        FieldBlock.prototype.unhint = function () {
            if (this._blockGroup.contains(this._hintBlock)) {
                this.game.tweens.removeFrom(this._hintBlock.scale);
                this.game.add.tween(this._hintBlock.scale).to({ x: 0, y: 0 }, 400, Phaser.Easing.Cubic.Out, true).onComplete.addOnce(function () {
                    this._blockGroup.remove(this._hintBlock);
                }, this);
                this._hinted = false;
            }
        };
        FieldBlock.prototype.appear = function (color, onlyPlaceholderBlock) {
            if (onlyPlaceholderBlock === void 0) { onlyPlaceholderBlock = false; }
            this._blockGroup.add(this._filledBlock);
            this._filledBlock.frameName = color;
            this._currColor = color;
            this.game.tweens.removeFrom(this._filledBlock.scale);
            this._filledBlock.scale.set(1, 1);
            this.game.add.tween(this._filledBlock.scale).to({ x: 1.2, y: 1.2 }, 150, Phaser.Easing.Linear.None, true, 0, 0, true);
            this.game.add.tween(this._filledBlock.scale).to({ x: 1.05, y: 1.05 }, 100, Phaser.Easing.Linear.None, true, 300, 0, true);
            this._empty = false;
            if (onlyPlaceholderBlock) {
                this._filledBlock.visible = false;
            }
            else {
                this._filledBlock.visible = true;
            }
        };
        FieldBlock.prototype.disappear = function (withStone) {
            if (withStone === void 0) { withStone = false; }
            if (withStone) {
                if (this._blockGroup.contains(this._filledBlock)) {
                    this.game.tweens.removeFrom(this._filledBlock.scale);
                    this._filledBlock.frameName = "grey";
                    this.game.add.tween(this._filledBlock.scale).to({ x: 1.2, y: 1.2 }, 350, Phaser.Easing.Linear.None, true, 200);
                    this.game.add.tween(this._filledBlock.scale).to({ x: 0, y: 0 }, 450, Phaser.Easing.Cubic.Out, true, 550).onComplete.addOnce(function () {
                        this._blockGroup.remove(this._filledBlock);
                    }, this);
                    this._empty = true;
                }
            }
            else {
                if (this._blockGroup.contains(this._filledBlock)) {
                    this.game.tweens.removeFrom(this._filledBlock.scale);
                    this.game.add.tween(this._filledBlock.scale).to({ x: 0, y: 0 }, 400, Phaser.Easing.Cubic.Out, true).onComplete.addOnce(function () {
                        this._blockGroup.remove(this._filledBlock);
                    }, this);
                    this._empty = true;
                }
            }
        };
        FieldBlock.CYAN = "1";
        FieldBlock.PINK = "2";
        FieldBlock.RED = "3";
        FieldBlock.ORANGE = "4";
        FieldBlock.YELLOW = "5";
        FieldBlock.ICE = "6";
        FieldBlock.GREEN = "7";
        FieldBlock.BLUE = "8";
        FieldBlock.VIOLET = "9";
        FieldBlock.PURPLE = "10";
        FieldBlock.COLOR_LIST = [FieldBlock.CYAN, FieldBlock.PINK, FieldBlock.RED, FieldBlock.ORANGE, FieldBlock.YELLOW, FieldBlock.ICE, FieldBlock.GREEN, FieldBlock.BLUE, FieldBlock.VIOLET, FieldBlock.PURPLE];
        return FieldBlock;
    }(Phaser.Sprite));
    TProject.FieldBlock = FieldBlock;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var GameField = (function (_super) {
        __extends(GameField, _super);
        function GameField(game, x, y) {
            var _this = _super.call(this, game, x, y, "gameAssets", "emptySprite") || this;
            _this._fieldLength = 10;
            _this._lineAnimated = false;
            _this.init();
            return _this;
        }
        Object.defineProperty(GameField.prototype, "wasLineAnimated", {
            get: function () { return this._lineAnimated; },
            enumerable: true,
            configurable: true
        });
        GameField.prototype.fieldBlockPosition = function (id) { return this._blocks[id].worldPosition; };
        GameField.prototype.init = function () {
            this._blocks = [];
            this._horizontalExplosions = [];
            this._verticalExplosions = [];
            this._line1Sound = this.game.make.sound("line_combo_1");
            this._line2Sound = this.game.make.sound("line_combo_2");
            this._line3Sound = this.game.make.sound("line_combo_3");
            this._blockLayer = this.game.make.group();
            this._effectLayer = this.game.make.sprite(TProject.Boot.gameConfig["blockOffset"], -TProject.Boot.gameConfig["blockOffset"], "gameAssets", "fieldLight");
            this._effectLayer.anchor.set(0.5, 0.5);
            this._effectLayer.alpha = 0;
            this._explosionLayer = this.game.make.group();
            var block;
            var x;
            var y;
            for (var i = 1; i <= this._fieldLength; i++) {
                for (var k = 1; k <= this._fieldLength; k++) {
                    x = -250 - (4.5 * TProject.Boot.gameConfig["blockOffset"]) + (50 * (k - 1)) + (TProject.Boot.gameConfig["blockOffset"] * (k - 1));
                    y = -250 - (4.5 * TProject.Boot.gameConfig["blockOffset"]) + (50 * (i - 1)) + (TProject.Boot.gameConfig["blockOffset"] * (i - 1));
                    block = new TProject.FieldBlock(this.game, x, y, ((i - 1) * this._fieldLength + (k - 1)), this, this._blockLayer);
                    this._blocks.push(block);
                }
            }
            var explosion;
            for (var k = 0; k < this._fieldLength; k++) {
                y = -250 - (4.5 * TProject.Boot.gameConfig["blockOffset"]) + (50 * (k)) + (TProject.Boot.gameConfig["blockOffset"] * (k)) + 25;
                explosion = new TProject.ExplosionLineAnimation(this.game, 0, y, true);
                this._explosionLayer.add(explosion);
                this._horizontalExplosions.push(explosion);
            }
            for (var k = 0; k < this._fieldLength; k++) {
                x = -250 - (4.5 * TProject.Boot.gameConfig["blockOffset"]) + (50 * (k)) + (TProject.Boot.gameConfig["blockOffset"] * (k)) + 25;
                explosion = new TProject.ExplosionLineAnimation(this.game, x, 0, false);
                this._explosionLayer.add(explosion);
                this._verticalExplosions.push(explosion);
            }
            this.addChild(this._effectLayer);
            this.addChild(this._blockLayer);
            this.addChild(this._explosionLayer);
            TProject.GameEvent.fieldChanged.add(this.checkIt, this);
        };
        GameField.prototype.initiateTutorial = function () {
            for (var i = 0; i < this._fieldLength; i++) {
                for (var k = 0; k < this._fieldLength; k++) {
                    if (i <= 8) {
                        this._blocks[i * this._fieldLength + k].visible = false;
                        if ((i + k) % 2 == 1) {
                            this._blocks[i * this._fieldLength + k].appear(TProject.FieldBlock.ORANGE, true);
                        }
                    }
                    else {
                        if (!((k == 4) || (k == 5))) {
                            this._blocks[i * this._fieldLength + k].appear(TProject.FieldBlock.ORANGE);
                        }
                    }
                    //console.log(this._blocks[i * this._fieldLength + k].position);
                }
            }
        };
        GameField.prototype.showSecondTutorPart = function () {
            for (var i = 0; i < this._blocks.length; i++) {
                this._blocks[i].disappear();
                this._blocks[i].visible = true;
            }
            for (var i = 0; i < this._fieldLength; i++) {
                for (var k = 0; k < this._fieldLength; k++) {
                    if (i >= 3) {
                        this._blocks[i * this._fieldLength + k].visible = false;
                        if ((i + k) % 2 == 1) {
                            this._blocks[i * this._fieldLength + k].appear(TProject.FieldBlock.ICE, true);
                        }
                    }
                    else {
                        if (!((k == 0) || (k <= 2 && i == 0))) {
                            this._blocks[i * this._fieldLength + k].appear(TProject.FieldBlock.ICE);
                        }
                    }
                    console.log(this._blocks[i * this._fieldLength + k].position);
                }
            }
        };
        GameField.prototype.endTheTutorial = function () {
            for (var i = 0; i < this._blocks.length; i++) {
                this._blocks[i].disappear();
                this._blocks[i].visible = true;
                if (i % 10 == 2 && (i < 40 || i > 60)) {
                    this._blocks[i].appear(TProject.FieldBlock.GREEN);
                }
                if (i % 10 > 3 && i < 20) {
                    this._blocks[i].appear(TProject.FieldBlock.YELLOW);
                }
                if (i % 10 > 6 && i > 70) {
                    this._blocks[i].appear(TProject.FieldBlock.RED);
                }
            }
        };
        GameField.prototype.saveCurrentField = function () {
            TProject.Boot.saveFieldObject = [];
            for (var i = 0; i < this._blocks.length; i++) {
                if (this._blocks[i].isFilled) {
                    TProject.Boot.saveFieldObject.push(this._blocks[i].currColor);
                }
                else {
                    TProject.Boot.saveFieldObject.push("");
                }
            }
        };
        GameField.prototype.loadExistingField = function () {
            for (var i = 0; i < this._blocks.length; i++) {
                if (TProject.Boot.saveFieldObject[i] != "") {
                    this._blocks[i].appear(TProject.Boot.saveFieldObject[i]);
                }
            }
        };
        GameField.prototype.clearToContinue = function () {
            for (var i = 0; i < this._fieldLength * 4; i++) {
                this._blocks[i].disappear();
            }
        };
        Object.defineProperty(GameField.prototype, "firstBlock", {
            get: function () {
                return this._blocks[0];
            },
            enumerable: true,
            configurable: true
        });
        GameField.prototype.fillTheShape = function (fieldID, shape) {
            for (var i = 0; i < shape.blockHeight; i++) {
                for (var k = 0; k < shape.blockWidth; k++) {
                    if (shape.blockMap[i][k]) {
                        this._blocks[fieldID + k + (i * this._fieldLength)].appear(shape.blockColor);
                    }
                }
            }
            this.checkIt();
        };
        GameField.prototype.getOverlapTiles = function (sprite) {
            var spriteBounds = new Phaser.Rectangle(sprite.topLeftSprite.getBounds().x, sprite.topLeftSprite.getBounds().y, sprite.topLeftSprite.getBounds().width, sprite.topLeftSprite.getBounds().height);
            var retVal = -1;
            this._output = [];
            for (var i = 0; i < this._fieldLength; i++) {
                for (var k = 0; k < this._fieldLength; k++) {
                    if (this.checkOverlap(this._blocks[(i * this._fieldLength + k)], spriteBounds)) {
                        this._output.push(this._blocks[(i * this._fieldLength + k)]);
                    }
                }
            }
            for (var i = 0; i < this._output.length; i++) {
                if (this.checkFilling(sprite, this._output[i].id)) {
                    retVal = this._output[i].id;
                    break;
                }
            }
            if (retVal == -1) {
                this._output = [];
                var distance = 100000;
                var tempDist = 0;
                for (var i = 0; i < this._fieldLength; i++) {
                    for (var k = 0; k < this._fieldLength; k++) {
                        if (this.checkOverlap(this._blocks[(i * this._fieldLength + k)], spriteBounds, 2)) {
                            this._output.push(this._blocks[(i * this._fieldLength + k)]);
                        }
                    }
                }
                for (var i = 0; i < this._output.length; i++) {
                    if (this.checkFilling(sprite, this._output[i].id)) {
                        tempDist = Phaser.Math.distance(this._output[i].x, this._output[i].y, spriteBounds.x, spriteBounds.y);
                        if (tempDist < distance) {
                            distance = tempDist;
                            retVal = this._output[i].id;
                        }
                    }
                }
            }
            return retVal;
        };
        GameField.prototype.clearField = function () {
            for (var i = 0; i < this._blocks.length; i++) {
                this._blocks[i].disappear(true);
            }
        };
        GameField.prototype.checkIfStone = function (gameblock) {
            if (this.searchInField(0, gameblock) == -2) {
                if (!gameblock.isItStone)
                    gameblock.stoneIt();
                return true;
            }
            if (gameblock.isItStone)
                gameblock.unstoneIt();
            return false;
        };
        GameField.prototype.showBlockShadow = function (gameblock) {
            var fieldBlockId = this.getOverlapTiles(gameblock);
            if (fieldBlockId >= 0) {
                this.hintThePlace(fieldBlockId, gameblock, false);
            }
        };
        GameField.prototype.checkIfOnePlace = function (gameblock) {
            var fieldBlockID = this.searchInField(1, gameblock);
            if (fieldBlockID >= 0) {
                this.hintThePlace(fieldBlockID, gameblock);
                return true;
            }
            return false;
        };
        GameField.prototype.unhintTheField = function () {
            for (var i = 0; i < this._fieldLength; i++) {
                for (var k = 0; k < this._fieldLength; k++) {
                    if (this._blocks[i * this._fieldLength + k].isHinted) {
                        this._blocks[i * this._fieldLength + k].unhint();
                    }
                }
            }
        };
        GameField.prototype.hintThePlace = function (fieldID, shape, withTween) {
            if (withTween === void 0) { withTween = true; }
            for (var i = 0; i < shape.blockHeight; i++) {
                for (var k = 0; k < shape.blockWidth; k++) {
                    if (shape.blockMap[i][k]) {
                        this._blocks[fieldID + k + (i * this._fieldLength)].hint(shape.blockColor, withTween);
                    }
                }
            }
        };
        GameField.prototype.searchInField = function (neededCound, gameblock) {
            var currCount = 0;
            var neededBlockID = -2;
            for (var i = 0; i < this._fieldLength; i++) {
                for (var k = 0; k < this._fieldLength; k++) {
                    if (this.checkFilling(gameblock, (i * this._fieldLength + k))) {
                        currCount++;
                        neededBlockID = i * this._fieldLength + k;
                        if (currCount > neededCound) {
                            return -1;
                        }
                    }
                }
            }
            return neededBlockID;
        };
        GameField.prototype.checkFilling = function (gameblock, startId) {
            if (gameblock.blockWidth + (startId % this._fieldLength) > this._fieldLength) {
                return false;
            }
            if (startId + (gameblock.blockHeight - 1) * this._fieldLength >= this._fieldLength * this._fieldLength) {
                return false;
            }
            for (var i = 0; i < gameblock.blockHeight; i++) {
                for (var k = 0; k < gameblock.blockWidth; k++) {
                    if (gameblock.blockMap[i][k] && this._blocks[startId + k + (i * this._fieldLength)].isFilled) {
                        return false;
                    }
                }
            }
            return true;
        };
        GameField.prototype.checkOverlap = function (fieldBLock, spriteBounds, defSize) {
            if (defSize === void 0) { defSize = 5; }
            var boundsA = fieldBLock.getBounds();
            var fieldBlockBounds = new Phaser.Rectangle(boundsA.x + (boundsA.width * (defSize - 1) / (defSize * 2)), boundsA.y + (boundsA.height * (defSize - 1) / (defSize * 2)), boundsA.width / defSize, boundsA.height / defSize);
            return Phaser.Rectangle.intersects(fieldBlockBounds, spriteBounds);
        };
        GameField.prototype.checkIt = function () {
            this._lineAnimated = false;
            this._lineToDel = [];
            this._rowToDel = [];
            for (var i = 1; i <= this._fieldLength; i++) {
                if (this.checkLine(i)) {
                    this._lineToDel.push(i);
                }
                if (this.checkRow(i)) {
                    this._rowToDel.push(i);
                }
            }
            if (this._lineToDel.length > 0) {
                for (var k = 0; k < this._lineToDel.length; k++) {
                    this.clearLine(this._lineToDel[k]);
                    this._horizontalExplosions[this._lineToDel[k] - 1].showExplosion();
                }
            }
            if (this._rowToDel.length > 0) {
                for (var j = 0; j < this._rowToDel.length; j++) {
                    this.clearRow(this._rowToDel[j]);
                    this._verticalExplosions[this._rowToDel[j] - 1].showExplosion();
                }
            }
            if (this._lineToDel.length != 0 || this._rowToDel.length != 0) {
                this._lineAnimated = true;
                this.game.tweens.removeFrom(this._effectLayer);
                this._effectLayer.alpha = 0;
                this.game.add.tween(this._effectLayer).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 150, 0, true);
                TProject.GameEvent.linesCleared.dispatch(this._rowToDel.length + this._lineToDel.length);
                TProject.Boot.totalLinesRemoved += this._rowToDel.length + this._lineToDel.length;
                TProject.Boot.removedLinesAtOnce = Math.max(TProject.Boot.removedLinesAtOnce, this._rowToDel.length + this._lineToDel.length);
                if (TProject.Boot.sfxEnable) {
                    if (this._rowToDel.length + this._lineToDel.length == 1) {
                        this._line1Sound.play();
                    }
                    else if (this._rowToDel.length + this._lineToDel.length == 2) {
                        this._line2Sound.play();
                    }
                    else {
                        this._line3Sound.play();
                    }
                }
            }
            TProject.GameEvent.moveDone.dispatch();
        };
        GameField.prototype.indicateColor = function (color) {
            switch (color) {
                case TProject.FieldBlock.CYAN:
                    TProject.Boot.cyanBlocksDestroyed++;
                    break;
                case TProject.FieldBlock.PINK:
                    TProject.Boot.pinkBlocksDestroyed++;
                    break;
                case TProject.FieldBlock.RED:
                    TProject.Boot.redBlocksDestroyed++;
                    break;
                case TProject.FieldBlock.ORANGE:
                    TProject.Boot.orangeBlocksDestroyed++;
                    break;
                case TProject.FieldBlock.YELLOW:
                    TProject.Boot.yellowBlocksDestroyed++;
                    break;
                case TProject.FieldBlock.ICE:
                    TProject.Boot.iceBlocksDestroyed++;
                    break;
                case TProject.FieldBlock.GREEN:
                    TProject.Boot.greenBlocksDestroyed++;
                    break;
                case TProject.FieldBlock.BLUE:
                    TProject.Boot.blueBlocksDestroyed++;
                    break;
                case TProject.FieldBlock.VIOLET:
                    TProject.Boot.violetBlocksDestroyed++;
                    break;
                case TProject.FieldBlock.PURPLE:
                    TProject.Boot.purpleBlocksDestroyed++;
                    break;
            }
        };
        GameField.prototype.clearLine = function (n) {
            for (var i = (n * this._fieldLength) - this._fieldLength; i < (n * this._fieldLength); i++) {
                if (this._blocks[i].isFilled) {
                    this.indicateColor(this._blocks[i].currColor);
                }
                this._blocks[i].disappear();
            }
        };
        GameField.prototype.clearRow = function (n) {
            for (var i = n - 1; i < n + (this._fieldLength * (this._fieldLength - 1)); i += this._fieldLength) {
                if (this._blocks[i].isFilled) {
                    this.indicateColor(this._blocks[i].currColor);
                }
                this._blocks[i].disappear();
            }
        };
        GameField.prototype.checkLine = function (n) {
            for (var i = (n * this._fieldLength) - this._fieldLength; i < (n * this._fieldLength); i++) {
                if (!this._blocks[i].isFilled) {
                    return false;
                }
            }
            return true;
        };
        GameField.prototype.checkRow = function (n) {
            for (var i = n - 1; i < n + (this._fieldLength * (this._fieldLength - 1)); i += this._fieldLength) {
                if (!this._blocks[i].isFilled) {
                    return false;
                }
            }
            return true;
        };
        return GameField;
    }(Phaser.Sprite));
    TProject.GameField = GameField;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var OverPopUp = (function (_super) {
        __extends(OverPopUp, _super);
        function OverPopUp(game, x, y) {
            var _this = _super.call(this, game, x, y, "gameAssets", "gameOver") || this;
            _this._fixAchieveMove = false;
            _this._currentAchieve = 0;
            _this._lastDuration = 0;
            _this._lastScore = 0;
            _this._currentScore = 0;
            _this._moneyVal = 0;
            _this.anchor.set(0.5, 0.5);
            _this.init();
            return _this;
        }
        OverPopUp.prototype.init = function () {
            if (!(this.game.renderer.type == Phaser.CANVAS)) {
                this._title = this.game.make.sprite(0, -this.height * 2 / 5, "menuTextAtlas", "gameOverTitle");
                this._againText = this.game.make.sprite(50, 0, "menuTextAtlas", "againTitle");
            }
            else {
                this._title = this.game.make.text(0, -this.height * 2 / 5, TProject.Boot.langConfig["gameOverText"], {
                    font: "48px " + TProject.Boot.fontName,
                    fill: "#242424"
                });
                this._againText = this.game.make.text(50, 0, TProject.Boot.langConfig["againText"], {
                    font: "46px " + TProject.Boot.fontName,
                    fill: "#FFFFFF"
                });
            }
            this._title.anchor.set(0.5, 0.5);
            this._finalScore = this.game.make.text(0, -180, "424", {
                font: "62px " + TProject.Boot.fontName,
                fill: "#434343"
            });
            this._finalScore.anchor.set(0.5, 0.5);
            this._moneyIcon = this.game.make.sprite(-35, -100, "gameAssets", "coin");
            this._moneyIcon.anchor.set(0.5, 0.5);
            this._moneyText = this.game.make.text(this._moneyIcon.x + this._moneyIcon.width / 2 + 10, this._moneyIcon.y, this._moneyVal + "", {
                font: "32px " + TProject.Boot.fontName,
                fill: "#555555"
            });
            this._moneyText.anchor.set(0, 0.5);
            this._completedAchievesText = this.game.make.text(0, this.height / 2 - 25, "", {
                font: "30px " + TProject.Boot.fontName,
                fill: "#4e342e"
            });
            this._completedAchievesText.anchor.set(0.5, 0.5);
            this._againButton = this.game.make.sprite(0, 10, "gameAssets", "againButton");
            this._againButton.anchor.set(0.5, 0.5);
            this._againButton.inputEnabled = true;
            this._againButton.events.onInputUp.add(this.onAgainHandler, this);
            this._againButton.visible = false;
            var self = this;
            self._againButton.visible = true;
            this._againText.anchor.set(0.5, 0.5);
            this._againButton.addChild(this._againText);
            this._achieveLine = this.game.make.sprite(0, this._againButton.y + this._againButton.height / 2 + 10, "gameAssets", "lineGameOver");
            this._achieveLine.anchor.set(0.5, 0);
            this._achieveGroup = TProject.Boot.achieveManager.achieveGroup;
            this._achieveGroup.position.set(-this.width / 2, this._achieveLine.y + this._achieveLine.height);
            this._achieveMask = this.game.make.graphics(this._achieveGroup.x, this._achieveGroup.y);
            this._achieveMask.beginFill(0xffffff);
            this._achieveMask.drawRect(0, 0, this.width, 200);
            this._achieveMask.inputEnabled = true;
            this._achieveMask.events.onInputUp.add(this.moveAchieves, this);
            this._achieveMask.events.onInputDown.add(this.registerAchieveMove, this);
            this._achieveGroup.mask = this._achieveMask;
            var spr = this.game.make.sprite(0, 0, "gameAssets", "achieveBack");
            spr.alpha = 0;
            this._achieveGroup.add(spr);
            spr = this.game.make.sprite(0, 100, "gameAssets", "achieveBack");
            spr.alpha = 0.1;
            this._achieveGroup.add(spr);
            this.addChild(this._moneyIcon);
            this.addChild(this._againButton);
            this.addChild(this._title);
            this.addChild(this._finalScore);
            this.addChild(this._achieveLine);
            this.addChild(this._achieveGroup);
            this.addChild(this._achieveMask);
            this.addChild(this._moneyText);
            this.addChild(this._completedAchievesText);
            this._fixAchieveMove = false;
            this.updateAchieveGroupPos();
            TProject.GameEvent.onScoreChange.add(this.scoreChanged, this);
        };
        OverPopUp.prototype.createPseudoParticleMoney = function (x, y) {
            var _this = this;
            var coin1 = this.game.make.sprite(x, y, "gameAssets", "coin");
            var coin2 = this.game.make.sprite(x, y, "gameAssets", "coin");
            var coin3 = this.game.make.sprite(x, y, "gameAssets", "coin");
            coin1.anchor.set(0.5, 0.5);
            coin2.anchor.set(0.5, 0.5);
            coin3.anchor.set(0.5, 0.5);
            this.addChild(coin1);
            this.addChild(coin2);
            this.addChild(coin3);
            this.game.add.tween(coin1).to({ y: this._moneyIcon.y }, 1000, Phaser.Easing.Sinusoidal.InOut, true);
            this.game.add.tween(coin1).to({ x: this._moneyIcon.x + 50 }, 400, Phaser.Easing.Exponential.Out, true).onComplete.addOnce(function () {
                _this.game.add.tween(coin1).to({ x: _this._moneyIcon.x }, 600, Phaser.Easing.Linear.None, true).onComplete.addOnce(function () {
                    coin1.destroy();
                });
            });
            this.game.add.tween(coin2).to({ y: this._moneyIcon.y }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 250);
            this.game.add.tween(coin2).to({ x: this._moneyIcon.x + 50 }, 400, Phaser.Easing.Exponential.Out, true, 250).onComplete.addOnce(function () {
                _this.game.add.tween(coin2).to({ x: _this._moneyIcon.x }, 600, Phaser.Easing.Linear.None, true).onComplete.addOnce(function () {
                    coin2.destroy();
                });
            });
            this.game.add.tween(coin3).to({ y: this._moneyIcon.y }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 500);
            this.game.add.tween(coin3).to({ x: this._moneyIcon.x + 50 }, 400, Phaser.Easing.Exponential.Out, true, 500).onComplete.addOnce(function () {
                _this.game.add.tween(coin3).to({ x: _this._moneyIcon.x }, 600, Phaser.Easing.Linear.None, true).onComplete.addOnce(function () {
                    coin3.destroy();
                });
            });
        };
        OverPopUp.prototype.scoreChanged = function () {
            this._currentScore = arguments[0];
        };
        OverPopUp.prototype.updateAchieveGroupPos = function (withTween) {
            if (withTween === void 0) { withTween = false; }
            this.game.tweens.removeFrom(this._achieveGroup);
            if (!withTween) {
                this._achieveGroup.y = this._achieveLine.y + this._achieveLine.height - (this._currentAchieve * 100);
            }
            else {
                this.game.add.tween(this._achieveGroup).to({ y: this._achieveLine.y + this._achieveLine.height - (this._currentAchieve * 100) }, 250, Phaser.Easing.Cubic.Out, true);
            }
        };
        OverPopUp.prototype.goToTheNewAchieves = function () {
            var _this = this;
            if (this._currentAchieve == 0) {
                this._achieveMask.events.onInputUp.add(this.moveAchieves, this);
                this._achieveMask.events.onInputDown.add(this.registerAchieveMove, this);
            }
            else {
                this.game.tweens.removeFrom(this._achieveGroup);
                var achievesCount_1 = this._currentAchieve;
                this._currentAchieve = 0;
                this.game.add.tween(this._achieveGroup).to({ y: this._achieveLine.y + this._achieveLine.height - (this._currentAchieve * 100) }, achievesCount_1 * 300, Phaser.Easing.Cubic.Out, true, 1000).onComplete.addOnce(function () {
                    _this._achieveMask.events.onInputUp.add(_this.moveAchieves, _this);
                    _this._achieveMask.events.onInputDown.add(_this.registerAchieveMove, _this);
                    _this.createPseudoParticleMoney(-98, 138);
                    if (achievesCount_1 > 1) {
                        _this.createPseudoParticleMoney(-98, 238);
                    }
                    var tw = _this.game.add.tween(_this).to({ _moneyVal: TProject.Boot.currentMoney }, 600, Phaser.Easing.Linear.None, true, 1000);
                    tw.onUpdateCallback(function () {
                        this._moneyText.text = Math.floor(this._moneyVal) + "";
                    }, _this);
                    tw.onComplete.addOnce(function () {
                        this._moneyVal = TProject.Boot.currentMoney;
                        this._moneyText.text = this._moneyVal + "";
                        tw = null;
                    }, _this);
                }, this);
            }
        };
        OverPopUp.prototype.registerAchieveMove = function () {
            this._fixAchieveMove = true;
            this._fixPointerPositiony = this.game.input.activePointer.position.y;
        };
        OverPopUp.prototype.moveAchieves = function () {
            var difPos = this.game.input.activePointer.position.y - this._fixPointerPositiony;
            var difPercents = Math.ceil(difPos / (this.game.height / 10));
            console.log(difPercents);
            if (this._lastDuration <= 300) {
                this._currentAchieve -= difPercents;
            }
            else {
                this._currentAchieve -= Math.ceil(difPos / (100 * this.scale.y));
            }
            this._currentAchieve = Math.min(this._currentAchieve, TProject.Boot.achieveManager.achievesCount - 2);
            this._currentAchieve = Math.max(this._currentAchieve, 0);
            this.game.add.tween(this._achieveGroup).to({ y: this._achieveLine.y + this._achieveLine.height - (this._currentAchieve * 100) }, 250, Phaser.Easing.Cubic.Out, true);
            this._fixAchieveMove = false;
        };
        OverPopUp.prototype.showNewAchieves = function () {
            this._currentAchieve = TProject.Boot.achieveManager.newAchievesCount;
            this.updateAchieveGroupPos();
            this._achieveMask.events.onInputUp.remove(this.moveAchieves, this);
            this._achieveMask.events.onInputDown.remove(this.registerAchieveMove, this);
            this.goToTheNewAchieves();
            TProject.GameEvent.newAchieveRequest.dispatch();
        };
        OverPopUp.prototype.show = function (countDelay) {
            TProject.Boot.achieveManager.updateAchievesVisibleArea(this._achieveLine.y + this._achieveLine.height);
            this.visible = true;
            this._finalScore.text = this._lastScore + "";

            var score = this._currentScore;
            sdkHandler.trigger('gameOver', {
                score: score
            }, this);

            this._moneyVal = TProject.Boot.currentMoney;
            if (TProject.Boot.achieveManager.newAchievesCount > 0) {
                this._moneyVal -= 30;
                if (TProject.Boot.achieveManager.newAchievesCount > 1) {
                    this._moneyVal -= 30;
                }
            }
            this._moneyText.text = this._moneyVal + "";
            this._completedAchievesText.text = TProject.Boot.changedString([TProject.Boot.achieveManager.openedCount, TProject.Boot.achieveManager.achievesCount], TProject.Boot.langConfig["completedText"]);
            var tw = this.game.add.tween(this).to({ _lastScore: this._currentScore }, 350, Phaser.Easing.Linear.None, true, countDelay);
            tw.onUpdateCallback(function () {
                this._finalScore.text = Math.floor(this._lastScore) + "";
            }, this);
            tw.onComplete.addOnce(function () {
                this._lastScore = this._currentScore;
                this._finalScore.text = this._lastScore + "";
                tw = null;
            }, this);
        };
        OverPopUp.prototype.update = function () {
            if (this._fixAchieveMove) {
                var difPos = this.game.input.activePointer.position.y - this._fixPointerPositiony;
                this._lastDuration = this.game.input.activePointer.duration;
                this._achieveGroup.y = this._achieveLine.y + this._achieveLine.height - (this._currentAchieve * 100) + difPos;
            }
            if (this.visible) {
                TProject.Boot.achieveManager.updateAchievesVisibleArea(this._achieveLine.y + this._achieveLine.height);
            }
        };
        OverPopUp.prototype.onAgainHandler = function () {
            TProject.Boot.achieveManager.clearNewAchieves();
            TProject.GameEvent.restartNeeded.dispatch();
        };
        return OverPopUp;
    }(Phaser.Sprite));
    TProject.OverPopUp = OverPopUp;
})(TProject || (TProject = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var UIButton = (function (_super) {
        __extends(UIButton, _super);
        function UIButton(game, x, y, key, callback, switchKeyOff, startState) {
            if (switchKeyOff === void 0) { switchKeyOff = null; }
            if (startState === void 0) { startState = null; }
            var _this = _super.call(this, game, x, y) || this;
            if (switchKeyOff != null) {
                _this._buttonSpriteOff = _this.game.make.sprite(0, 0, "gameAssets", switchKeyOff);
                _this._buttonSpriteOff.anchor.set(0.5, 0.5);
                _this._buttonSpriteOff.visible = false;
                _this.addChild(_this._buttonSpriteOff);
            }
            _this._buttonSprite = _this.game.make.sprite(0, 0, "gameAssets", key);
            _this._buttonSprite.anchor.set(0.5, 0.5);
            _this.addChild(_this._buttonSprite);
            _this._buttonWidth = _this._buttonSprite.width;
            _this._buttonHeight = _this._buttonSprite.height;
            _this._callBack = callback;
            _this.inputEnabled = true;
            _this.events.onInputUp.add(_this.onClickHandler, _this);
            if (startState != null) {
                if (!startState) {
                    _this._buttonSpriteOff.visible = true;
                    _this._buttonSprite.visible = false;
                }
            }
            return _this;
        }
        UIButton.prototype.onClickHandler = function (target, pointer, stillThere) {
            if (stillThere) {
                if (TProject.Boot.sfxEnable) {
                }
                if (this._buttonSpriteOff) {
                    this._buttonSpriteOff.visible = !this._buttonSpriteOff.visible;
                    this._buttonSprite.visible = !this._buttonSpriteOff.visible;
                }
                if (this._callBack != null) {
                    this._callBack();
                }
            }
        };
        Object.defineProperty(UIButton.prototype, "buttonWidth", {
            get: function () {
                return this._buttonWidth * this.scale.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIButton.prototype, "buttonHeight", {
            get: function () {
                return this._buttonHeight * this.scale.y;
            },
            enumerable: true,
            configurable: true
        });
        UIButton.prototype.showBtn = function (momentally) {
            if (momentally === void 0) { momentally = false; }
            this.visible = true;
            this.inputEnabled = true;
            this.ignoreChildInput = false;
            this.game.tweens.removeFrom(this._buttonSprite);
            if (momentally) {
                this._buttonSprite.scale.setTo(1, 1);
                if (this._buttonSpriteOff) {
                    this._buttonSpriteOff.scale.setTo(1, 1);
                }
            }
            else {
                this._buttonSprite.scale.setTo(0, 0);
                this.game.add.tween(this._buttonSprite.scale).to({ x: 1, y: 1 }, 300, Phaser.Easing.Exponential.Out, true);
                if (this._buttonSpriteOff) {
                    this._buttonSpriteOff.scale.setTo(0, 0);
                    this.game.add.tween(this._buttonSpriteOff.scale).to({ x: 1, y: 1 }, 300, Phaser.Easing.Exponential.Out, true);
                }
            }
        };
        UIButton.prototype.hideBtn = function (momentally) {
            if (momentally === void 0) { momentally = false; }
            this.game.tweens.removeFrom(this._buttonSprite);
            this.inputEnabled = false;
            this.ignoreChildInput = true;
            if (momentally) {
                this.visible = false;
            }
            else {
                this.game.add.tween(this._buttonSprite.scale).to({ x: 0, y: 0 }, 300, Phaser.Easing.Exponential.In, true).onComplete.addOnce(function () {
                    this.visible = false;
                }, this);
                if (this._buttonSpriteOff) {
                    this.game.add.tween(this._buttonSpriteOff.scale).to({ x: 0, y: 0 }, 300, Phaser.Easing.Exponential.In, true);
                }
            }
        };
        UIButton.prototype.destroy = function () {
            this.game.tweens.removeFrom(this._buttonSprite);
            if (this._buttonSpriteOff) {
                this.game.tweens.removeFrom(this._buttonSpriteOff);
            }
            this.events.onInputUp.remove(this.onClickHandler, this);
            this._callBack = null;
            this._buttonWidth = null;
            this._buttonHeight = null;
            _super.prototype.destroy.call(this);
        };
        return UIButton;
    }(Phaser.Sprite));
    TProject.UIButton = UIButton;
})(TProject || (TProject = {}));


const dataMigrator = (function()
{

    function checkIsThereLocalStorageData()
    {
        if(
            localStorage.getItem("gameData") !== null &&
            localStorage.getItem("gameData") !== undefined &&
            localStorage.getItem("gameData").length > 0
        )
            return true;
        else
            return false;
    }

    function migrateLocalDataToPlatform()
    {

        if(checkIsThereLocalStorageData())
        {
            console.log("%c Local storage data found! Saving data on platform...", 'background: #222; color: #bada55');
            let dataToStore = localStorage.getItem("gameData");
            sdkHandler.trigger('save',  {
                key: '2020-plus',
                value: dataToStore,
                callback: (err) => {
                    if(err)
                    {
                        console.log("%c Couldn't save data due to error: "+err, 'background: #222; color: #bada55');
                    }
                    else
                    {
                        console.log("%c Data successfully saved! "+dataToStore, 'background: #222; color: #bada55');
                    }

                }
            })
        }
        else
        {
            console.log("%c No data found, aborting migration...", 'background: #222; color: #bada55');
        }
    }

    return {
        migrateLocalDataToPlatform: migrateLocalDataToPlatform,
    };
})()


const mySaver = (function()
{
    const mySaver = {
        loadData: loadData,
        save: save,
        get: get,
        data: {}
    };

    function loadData()
    {
        return new Promise(function(resolve, reject) {
            sdkHandler.trigger("restore", {
                key: '2020-plus',
                callback: (error, value) => {
                    if (error)
                    {
                        reject(error);
                    }
                    else
                    {
                        console.log('%c Loaded platform data! '+value, 'background: #222; color: #bada55');
                        mySaver.data["saveGameObject_"] = JSON.parse(value);
                        if (mySaver.data == null) mySaver.data = {};
                        resolve();
                    }
                }
            })
        })
    }

    function get(which)
    {
        var dataKey = which;
        if(!dataKey)
            return mySaver.data;
        else
            return mySaver.data[which]
    }

    function save(which, what)
    {
        mySaver.data[which] = what;

        return new Promise(function(resolve, reject) {
            sdkHandler.trigger('save', {
                key: '2020-plus',
                value: JSON.stringify(mySaver.data["saveGameObject_"]),
                callback: (err) => {
                    if (err) reject(err);
                    else resolve();
                },
            })
        })
    }

    return mySaver;
})();