//
// save.js
// The JS for saves
//
// Last updated - 05/08/2015
//
// Most save stuff is handled by the code that needs it.
// This is mainly for constants.

debuglog("Initializing save.js...");

/* Comment this out if neeeded */ // if(DEBUG_MODE) localStorage["fnaf-js-savegame.night"] = "7";

/* Set save for first time */ 
if((typeof localStorage["fnaf-js-savegame.night"])=="undefined") localStorage["fnaf-js-savegame.night"]="1";
if((typeof localStorage["fnaf-js-savegame.stars"])=="undefined") localStorage["fnaf-js-savegame.stars"]="0";

console.log("Saved game loaded! Night is #"+localStorage["fnaf-js-savegame.night"]+" and has "+localStorage["fnaf-js-savegame.stars"]+" achievements");