//
// sound.js
// The JS for sound engine
// Very basic one I made
//
// Last updated - 11/05/2015

// playSound(filename, volume, loop?, channelnumber) - Play a sound
// ShowAudioChannels() - Shows audio that different channels are playing.
// loopSound() - Used by playSound to loop sounds using eventlisteners
// stopSound(channelnumber) - Stop a sound on a specific channel or all of them.
// stopAmbientSound() - Stops all the ambient sound; for gameovers.

/**
 * @file The JS for sound engine
 * @author Sam Lynch
 * @version 1.0.0
 * @readonly
 * @copyright (c) 2015 Amduat Games
 */

debuglog("Initializing sound.js...");

/** @constant
    @type {float}
    @default
	@readonly
*/
var DEFAULT_VOLUME = 0.3;

var ambiance1 = new SeamlessLoop();
var ambiance2 = new SeamlessLoop();
ambiance1.addUri("sounds/Buzz_Fan_Florescent2.wav", 9600, "ambiancetrack1");
ambiance2.addUri("sounds/ambience2.wav", 60000, "ambiancetrack2");

/** @namespace 
* @description The namespace for accessing the sound engine. */
var sound=new function(){
	
	/** @function playSound 
	 * @description Plays the specified sound file from sounds[]
	 * @param {string} src Sound filename
	 * @param {float} [volume] Volume of the sound, defaults to DEFAULT_VOLUME if unspecified
	 * @param {boolean} [loop] Loop the sound if true
	*/
	this.playSound=function(src, volume, loop) {
		if (DEBUG_MODE) return debuglog("Suppressing "+src+" due to debug mode");
		if ((typeof loop) == "undefined" || loop == false) {
			loop = false;
		};
		if ((typeof volume) == "undefined") {
			volume = DEFAULT_VOLUME;
		};
		if ((typeof src) == "undefined") {
			return debuglog("playSound(src [string], volume [float], loop? [bool]) error - no sound specified");
		};
		for (x = 0; x < sounds.length; x++) {
			if (sounds[x].name == src) {
				sounds[x].file.removeEventListener("ended", sound.loopSound);
				if(sounds[x].file.paused==false){
					sounds[x].file.pause();
					sounds[x].file.currentTime = 0;
				};
				sounds[x].file.volume = volume;
				sounds[x].file.loop = loop;
				if (loop == true) {
					sounds[x].file.addEventListener('ended', sound.loopSound, false);
				};
				sounds[x].file.play();
				return debuglog("Sound " + sounds[x].name + " now playing at " + (volume * 100) + "% volume.");
			};
		};
		return debuglog("Sound " + src + " not found, is it in sounds[]?");
	};
	
	/** @function loopSound 
	* @description Called by eventlistener to replay the sound */
	this.loopSound=function(){this.currentTime = 0;this.play();};

	/** @function stopSound 
	* @description Stops the specified sound 
	* @param {string} src Sound filename */
	this.stopSound=function(src){if((typeof src)=="undefined") {console.log("stopSound() error - no sound specified\nProceeding to stop all sound..."); for(x=0;x<sounds.length;x++){ if(sounds[x].file.paused==false){ sounds[x].file.pause(); return console.log(""+sounds[x].name+" is paused/stopped"); }; }; return; } else { for(x=0;x<sounds.length;x++){ if(sounds[x].name==src){ sounds[x].file.pause(); return; }; }; return console.log("stopSound() error - invalid sound specified."); }; };

	/** @function stopAmbientSound 
	* @description Stops both ambient tracks */
	this.stopAmbientSound=function(){
		if(DEBUG_MODE==false){
			ambiance1.stop();
			ambiance2.stop();
		};
	};
};