


const scriptsInEvents = {

		async Flowmanager_Event31_Act2(runtime, localVars)
		{
			PokiSDK.commercialBreak().then(
			    () => {
			        console.log("Commercial break finished, proceeding to game");
			        PokiSDK.gameplayStart();
					runtime.globalVars.PAUSED = false;
			        // your code to continue to game
			    }
			);
		},

		async Flowmanager_Event39_Act5(runtime, localVars)
		{
			PokiSDK.gameplayStop();
			console.log("Gameplay has stopped");
		},

		async Flowmanager_Event57_Act14(runtime, localVars)
		{
			
		},

		async Pokisdk_Event2_Act4(runtime, localVars)
		{
			runtime.globalVars.PokiHasInitialised = globalThis.PokiHasInitialised;
		},

		async Pokisdk_Event3_Act1(runtime, localVars)
		{
			PokiSDK.gameLoadingStart();
			console.log("gameloading has started");
		},

		async Pokisdk_Event4_Act1(runtime, localVars)
		{
			PokiSDK.gameLoadingFinished();
			console.log ("gameloading has finished");
		},

		async Functions_Event19_Act1(runtime, localVars)
		{
			PokiSDK.gameplayStop();
			console.log("Gameplay has stopped");
		},

		async Functions_Event21_Act1(runtime, localVars)
		{
			PokiSDK.gameplayStop();
			console.log("Gameplay has stopped");
		},

		async Functions_Event111_Act3(runtime, localVars)
		{
			PokiSDK.gameplayStop();
			
			PokiSDK.rewardedBreak().then(
			    (success) => {
			        if(success) {
			          // video was displayed, give reward
					  runtime.globalVars.PAUSED = false;
					  runtime.globalVars.RWDX2wasTriggered=true;
					  runtime.globalVars.isPlayingRwd=false;
			        }
			        else {
			          // video not displayed, should probably not give reward
			        }
			
			        //PokiSDK.gameplayStart();
			        // your code to continue to game
			        //continueToGame();
					//runtime.globalVars.PAUSED = false;
			    }
			);
		},

		async Functions_Event113_Act3(runtime, localVars)
		{
			PokiSDK.gameplayStop();
			
			PokiSDK.rewardedBreak().then(
			    (success) => {
			        if(success) {
			          // video was displayed, give reward
					  runtime.globalVars.PAUSED = false;
					  runtime.globalVars.rwdSkinwasTriggered=true;
					  runtime.globalVars.isPlayingRwd=false;
			        }
			        else {
			          // video not displayed, should probably not give reward
			        }
			
			        //PokiSDK.gameplayStart();
			        // your code to continue to game
			        //continueToGame();
					//runtime.globalVars.PAUSED = false;
			    }
			);
		}

};

self.C3.ScriptsInEvents = scriptsInEvents;

