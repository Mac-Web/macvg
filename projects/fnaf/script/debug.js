//
// debug.js
// The JS for debug stuff
//
// Last updated - 12/08/2015

/**
 * @file Code for debugging
 * @author Sam Lynch
 * @version 1.0.0
 * @copyright (c) 2015 Amduat Games
 */
 
var debugCSS = "background: #ADE1FF; color: #8E3504; border-radius: 5px;padding: 4px 4px;font-family: 'Courier New', Courier, monospace;font-weight: bold;";


/** @constant
    @type boolean
    @default
	@readonly
*/
var DEBUG_MODE = false;

var cssString = "%c";
var NWGUI;

// OPTIONS = "HTML", "NW.JS"
/** @constant
    @type string
    @default
	@readonly
*/
var BUILD_TARGET = "HTML";

var greenworks;

debuglog("Initializing debug.js...");

var debugdiv = document.getElementById("debuginfo");

/** @function debugInfo 
 * @description Updates debugdiv with AI information
*/
function debugInfo(){
	debugdiv.innerHTML = "Chica location: CAM-"+roomClosenessChica[animatronicStates[0].currentRoomArray].name+"<br>";
	debugdiv.innerHTML += "Bonnie location: CAM-"+roomClosenessBunny[animatronicStates[1].currentRoomArray].name+"<br>";
	debugdiv.innerHTML += "Freddy location: CAM-"+roomClosenessFreddy[animatronicStates[2].currentRoomArray].name+"<br>";
	debugdiv.innerHTML += "Foxxy state: "+animatronicStates[3].state+"<br><br>";
	debugdiv.innerHTML += "Chica timer: "+chicatimer+" out of "+chicadifficultyarray[chicadifficulty]+"<br>";
	debugdiv.innerHTML += "Bonnie timer: "+bunnytimer+" out of "+bunnydifficultyarray[bunnydifficulty]+"<br>";
	debugdiv.innerHTML += "Freddy timer: "+freddytimer+" out of "+freddydifficultyarray[freddydifficulty]+"<br>";
	debugdiv.innerHTML += "Foxxy timer: "+foxxytimer+" out of "+foxydifficultyarray[foxydifficulty]+"<br>";
};

if (DEBUG_MODE==true){
	document.getElementById("debugmode").innerHTML = "DEBUG MODE";
	$(document).ready(function() {
		$(document).bind('keydown',function(e){
		   if(e.keyCode == 88) {
		       playfreddygameoveranimation("freddyoffice");
		   };
		});
	});
	$(window).on("error",function(msg,url,linenumber) {
		sound.playSound("error.wav",1.0);
		document.getElementById("debugmode").innerHTML+="<br><a style='color: red;font-weight: bold;'>ERROR - SEE CONSOLE</a>"
		return true;
	});
} else {
	$(window).on("error",function(msg,url,linenumber) {
		sound.playSound("error.wav",1.0);
		document.getElementById("debugmode").innerHTML+="<a style='color: red;font-weight: bold;'>ERROR - SEE CONSOLE - "+msg+"</a><br>"
		return true;
	});
};

/** @function debuglog 
 * @description Shows a message in the console if DEBUG_MODE is enabled.
 * @param {string} string Message to show
 * @param {auto} [additional] Variable to pass onto console message
 * @param {auto} [additional2] Second variable to pass onto console message
*/
function debuglog(string,additional,additional2){
	if(DEBUG_MODE==false) return;
	if((typeof string) == "undefined"){
		return;
	};
	if((typeof additional)=="undefined"){
		string = cssString.concat(string);
		return console.log(string,debugCSS);
	} else if(((typeof additional2)=="undefined") && additional){
		return console.log(string,additional);
	};
	console.log(string,additional,additional);
};

/** @function printSave 
 * @description Prints the night the player is on into the console.
*/
function printSave(){
	return console.log("Player is on night %s ",localStorage["fnaf-js-savegame.night"]);
};
