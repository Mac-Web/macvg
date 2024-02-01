var PokiPlugin = {
    adblock : false,
    canShowAds : false,
    isAlreadyLoaded : false,
    isPaused : false,
    isGamePaused : false,
    init : function(){
        var isMobile = Utils.getURLParam('isMobile');
    
        if(isMobile){
            console.log('It works in mobile application wrapper, PokiSDK wont be working');
            
            return false;
        }

        var style = document.createElement('style');
        style.innerHTML = '#application-console{ display:none; }'
        document.head.appendChild(style);
        
        var script = document.createElement('script');
        script.src = 'patch/js/poki-sdk.js';
        script.onload = function(){
            PokiPlugin.onLoad();
        };

        document.head.append(script);
    },
    onLoad : function(){
        PokiSDK.init({ volume: 0.35 }).then(function(){
            console.log('PokiSDK Loaded!');
            PokiPlugin.loadCompleted();
            PokiPlugin.canShowAds = true;
        }).catch(function(){
            PokiPlugin.adblock = true;
            PokiPlugin.loadCompleted();
            console.log('Initialized, but the user likely has adblock');
        });
    },
    loadCompleted : function(){
        if(this.isAlreadyLoaded){
            return false;
        }

        //requested to fire after load complete
        PokiSDK.gameLoadingFinished();

        //has been requested by Poki to trigger commercial before gameplay
        //PokiPlugin.showMidroll();
        //PokiPlugin.playGame();

        this.isAlreadyLoaded = true;
    },
    onPause : function(){
        if(this.isGamePaused){
            return false;
        }

        if(typeof PokiSDK !== 'undefined'){
            PokiSDK.gameplayStop();
        }

        this.isGamePaused = true;
    },
    pauseGame : function(){
        if(typeof pc !== 'undefined'){
            pc.app.timeScale = 0;
            PokiPlugin.isPaused = true;

            if(pc.app.systems && pc.app.systems.sound){
                pc.app.systems.sound.volume = 0;
            }

            pc.app.fire('Player:Stop');
            pc.app.fire('Gameplay:Pause');
        }
        
        PokiPlugin.onPause();
    },
    onPlay : function(){
        if(!this.isGamePaused){
            return false;
        }

        if(typeof PokiSDK !== 'undefined'){
            PokiSDK.gameplayStart();
        }

        this.isGamePaused = false;
    },
    firstGameplayEvent : function(){
        if(this.isAlreadyTriggered){
            return false;
        }

        if(typeof PokiSDK !== 'undefined'){
            PokiSDK.gameplayStart();
        }
        
        this.isAlreadyTriggered = true;
    },
    playGame : function(){
        if(typeof pc !== 'undefined'){
            pc.app.timeScale = 1;
            PokiPlugin.isPaused = false;

            if(pc.app.systems && pc.app.systems.sound){
                pc.app.systems.sound.volume = 1.0;
            }
            
            pc.app.fire('Gameplay:Play');
        }

        PokiPlugin.onPlay();
    },
    showMidroll : function(callback){
        if(typeof PokiSDK !== 'undefined'){
            PokiPlugin.pauseGame();
            PokiSDK.commercialBreak().
            then(function(success){
                if(callback){
                    callback(success);
                }

                PokiPlugin.playGame();
            });
        }else{
            callback();
        }
    },
    showReward : function(callback, options){
        if(PokiPlugin.adblock){
            if(typeof pc !== 'undefined'){
                pc.app.fire('Overlay:Adblock');
            }
            
            return false;
        }

        if(!PokiPlugin.canShowAds){
            if(typeof pc !== 'undefined'){
                pc.app.fire('Overlay:Adblock');
            }
            return false;
        }

        if(options && options.disableEvents){
            //events disabled
            console.log('Events disabled');
        }else{
            PokiPlugin.pauseGame();
        }

        PokiSDK.rewardedBreak().
        then(function(success){
            if(success){
                callback(success);
            }
        
            if(options && options.disableEvents){
                console.log('Events disabled');
                //events disabled
            }else{
                PokiPlugin.playGame();
            }
        });
    }
};

PokiPlugin.init();

window.addEventListener('keydown', function(ev){
    if (['ArrowDown', 'ArrowUp', ' '].includes(ev.key)) {
        ev.preventDefault();
    }
});

window.addEventListener('wheel', function(ev){
    ev.preventDefault()
}, { passive: false });

//disable context
window.addEventListener('contextmenu', function(ev){
    ev.preventDefault();
});
