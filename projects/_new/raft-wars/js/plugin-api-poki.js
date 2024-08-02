Phaser.Plugin.API_POKI = function(game, parent) {
    Phaser.Plugin.call(this, game, parent);

    this.game = game;
    this.api_GamePause = null;
    this.api_GameContinue = null;
    this.api_isAdblock = false;

    this.bannerContainer = document.getElementById('banner');
    this.isBannerAdded = false;
};

Phaser.Plugin.API_POKI.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.API_POKI.prototype.constructor = Phaser.Plugin.StateTransition;

Phaser.Plugin.API_POKI.prototype.initAPI = function(api_GamePause, api_GameContinue) {
    PokiSDK.init().then(
        () => {
            // successfully initialized
            console.log("PokiSDK initialized");
            // continue to game
        }
    ).catch(
        () => {
            this.api_isAdblock = true;
            // initialized but the user has an adblock
            console.log("Adblock enabled");
            // feel free to kindly ask the user to disable AdBlock, like forcing weird usernames or showing a sad face; be creative!
            // continue to the game
        }
    );

    this.api_GamePause = api_GamePause;
    this.api_GameContinue = api_GameContinue;

    // PokiSDK.setDebug(true);
};

Phaser.Plugin.API_POKI.prototype.gameLoadingStart = function() {
    PokiSDK.gameLoadingStart();
};

Phaser.Plugin.API_POKI.prototype.gameLoadingFinished = function() {
    PokiSDK.gameLoadingFinished();
};

Phaser.Plugin.API_POKI.prototype.gameLoadingProgress = function(data) {
    PokiSDK.gameLoadingProgress(data);
};

Phaser.Plugin.API_POKI.prototype.gameplayStart = function() {
    PokiSDK.gameplayStart();
};

Phaser.Plugin.API_POKI.prototype.gameplayStop = function() {
    PokiSDK.gameplayStop();
};

Phaser.Plugin.API_POKI.prototype.happyTime = function(value) {
    PokiSDK.happyTime(value);
};

Phaser.Plugin.API_POKI.prototype.commercialBreak = function() {
    this.api_GamePause();

    PokiSDK.commercialBreak().then(
        () => {
            console.log("Commercial Break finished");
            this.api_GameContinue();
        }
    );
};

Phaser.Plugin.API_POKI.prototype.rewardedBreak = function() {
    this.api_GamePause();

    PokiSDK.rewardedBreak().then(
        (withReward) => {
            console.log(`Should the user get a reward? ${withReward}`);
            MainGame.getReward(withReward);
            this.api_GameContinue();
        }
    );
};

Phaser.Plugin.API_POKI.prototype.displayAd = function() {
    if(this.isBannerAdded) return;
    PokiSDK.displayAd(this.bannerContainer, '320x50');
    // PokiSDK.displayAd(this.bannerContainer, '728x90');
    this.isBannerAdded = true;
}

Phaser.Plugin.API_POKI.prototype.destroyAd = function() {
    if(!this.isBannerAdded) return;
    PokiSDK.destroyAd(this.bannerContainer);
    this.isBannerAdded = false;
}
