//
// FNAF-JS
// Five Night's at Freddy's - JavaScript
//
// Original game by Scott Cawthon
//
// Ported by Sam 'Slynch' Lynch
// Tested by Lewis 'Earwig' M.
// ^as well as just generally helping^
//
// For legality's sake, it is necessary to say that you may not monetize this code
// without my express permission. This also works the other way around; I cannot
// monetize this port without the original developer's permission.
// I also can't release it without authentication or DRM that checks if
// the user owns the normal version, otherwise I'm basically releasing the
// game for free.
//
// Planned methods of auth:
//  - Greenworks for executables
//  - Steam Web API login for HTML.
//
// Last updated - 12/08/2015

/**
 * @file Primary JavaScript file housing main loop and main menu code
 * @author Sam Lynch
 * @version 1.0.0
 * @copyright (c) 2015 Amduat Games
 */

debuglog("Initializing main.js...");

if(BUILD_TARGET == "NW.JS"){
	NWGUI = require('nw.gui');
	debuglog("Initializing Greenworks...");
	greenworks = require('./greenworks');
	if(greenworks.initAPI()){
		debuglog('Steam API has been initalized.');
	} else {
		alert('Error on initializing Steam API.');
		gui.App.quit();
	};
} else {
	debuglog('Skipping Steam auth...');
};

// document.getElementById("title").innerHTML += VERSION;

assertButtons();
var cachedbody = document.getElementById("alldahtml").innerHTML;

function mainThread() {
	if(currentPower>0) {
		updatePowerPercent();
		updatePowerUsage();
	}
    updateTime();
	//if(currentRoom=="1c" && feedopen == true && animatronicStates[3].state<3) {
	//	if(foxxytimer>0)foxxytimer--;
	//};
	if(bunnydifficulty!=0) updateBunnyAI();
	if(chicadifficulty!=0) updateChicaAI();
	if(foxydifficulty!=0) updateFoxxyAI();
	if(freddydifficulty!=0) updateFreddyAI();
	if(DEBUG_MODE==true) debugInfo();
	if(currentRoom=="2a" && animatronicStates[3].state!==3 && play2aanimation==false && animatronicStates[1].currentRoom!="2a") {
		play2aanimation=true;
		setTimeout(function(){
			play2aanimation=false;
			},445);
		playroomanimation("2a",Math.random());
	};
};

function loadgame2() {
	loadgame();
};

function newgame() {

LaggedAPI.GEvents.start();

LaggedAPI.APIAds.show('interstitial','fnaf-world','fnaf-world-game.jpg',function(response) {
if(response.success) {
console.log('ad finished');
//createjs.Sound.setMute(false);
}else {
console.log('ad error, continue');
//createjs.Sound.setMute(false);
}
});

	night = 1;
	foxydifficulty = 8;
	bunnydifficulty = 9;
	chicadifficulty = 6;
	freddydifficulty = 0;
	sound.stopSound();
	localStorage["fnaf-js-savegame.night"]="1";
	document.getElementById("newgamebg").style.display="block";
	document.getElementById("newgamebg").style.opacity="0";
	$("#newgamebg").animate({
		opacity: "1"
	},1000,function(){
		eval('setTimeout(function(){loadroomImages();loadEverythingElse();},5000)');
	});
};

function loadgame(nightmare) {
	if(typeof(nightmare)=="undefined" || nightmare == false){
		night = localStorage["fnaf-js-savegame.night"];
		if(night == "6" || night == "7") night = "5";
		switch(night){
			case "1":
				foxydifficulty = 8;
				bunnydifficulty = 9;
				chicadifficulty = 6;
				freddydifficulty = 0;
			break;
			case "2":
				foxydifficulty = 10;
				bunnydifficulty = 12;
				chicadifficulty = 9;
				freddydifficulty = 0;
			break;
			case "3":
				foxydifficulty = 12;
				bunnydifficulty = 15;
				chicadifficulty = 12;
				freddydifficulty = 10;
			break;
			case "4":
				foxydifficulty = 14;
				bunnydifficulty = 18;
				chicadifficulty = 15;
				freddydifficulty = 13;
			break;
			case "5":
				foxydifficulty = 16;
				bunnydifficulty = 19;
				chicadifficulty = 17;
				freddydifficulty = 16;
			break;
			case "6":
				foxydifficulty = 20;
				bunnydifficulty = 20;
				chicadifficulty = 19;
				freddydifficulty = 18;
			break;
			case "7":
				foxydifficulty = 16;
				bunnydifficulty = 19;
				chicadifficulty = 17;
				freddydifficulty = 16;
			break;
		};
	} else {
		alert("nightmare mode!");
		night = 6;
		foxydifficulty = 17;
		bunnydifficulty = 19;
		chicadifficulty = 17;
		freddydifficulty = 15;
	};
	sound.stopSound();
	loadroomImages();
	loadEverythingElse();
	if(DEBUG_MODE==true) debugdiv.style.display="block";
};

hours[0] = 12;
for(x=1;x<7;x++){
	hours[x] = x;
};

function updateAIPosition(AIID,AIstate,newroom,roomstate,oldroomstate){
	if(!AIID){
		debuglog("updateAIPosition(AI ID, AI new state, AI new room, new room state, old room state");
		return;
	};
	if(DEBUG_MODE) debuglog("updateRoomState("+animatronicStates[AIID].currentRoom+","+oldroomstate+")");
    updateRoomState(animatronicStates[AIID].currentRoom,oldroomstate,1); //old room
	updateAIState(AIID,AIstate,newroom);
    updateRoomState(newroom,roomstate); //new room
}

/** @function searchForState
 * @description Searches for the current state of a room
 * @param {string} room Name of the room
 * @returns {Number} roomstate Current state of specified room
*/
function searchForState(room){
    for (var i=0; i < currRoomStates.length; i++) {
        if (currRoomStates[i].name === room) {
            return currRoomStates[i].roomstate;
        };
    };
};

/** @function searchForRoomID
 * @description Searches for the ID of a room using the name
 * @param {string} room Name of the room
 * @returns {string} roomid ID of specified room
*/
function searchForRoomID(roomname){
    for (var i=0; i < currRoomStates.length; i++) {
        if (rooms[i].name === roomname) {
            return i;
        };
    };
};

/** @function searchForRoomID
 * @description Searches for the ID of a room using the name. Param 4 and 5 are deprecated.
 * @param {int} AIID ID of AI
 * @param {int} state What state to set the AI to
 * @param {boolean} updatetimer Reset the timer to 0 or not
 * @param {string} [newroom] Name of the room to set AI to
 * @param {int} [roomID] ID of the room to set AI to
*/
function updateAIState(AIID,state,updatetimer,newroom,roomID){
	if((typeof AIID)=="undefined"){
		debuglog("updateAIState:\nAIID - ID of the AI to update\nstate - What state to set it to\nnewroom - What room to change to\nroomID - I don't fucking know, the ID of the room but I don't know what it is used for.");
		return;
	};
	if(state=="") state = 0;//parseInt(state);
	if((typeof updatetimer)=="undefined") updatetimer = true;
    if(newroom=="") debuglog("No new room specified, expect errors if unintended");

	switch(AIID) {
		case 0:// chica
			animatronicStates[0].state=state;
			if(updatetimer==true) chicatimer=0;
            break;
		case 1: //Bunny
			animatronicStates[AIID].state=state;
			if(updatetimer==true) bunnytimer=0;
            break;
		case 2: //Freddy
			animatronicStates[AIID].state=state;
			if(updatetimer==true) freddytimer=0;
            break;
		case 3: //Foxy
            switch(state) {
                case 0: // hiding
					updateRoomState("1c",0,1);
                    break;
                case 1: // peeking round curtain
					updateRoomState("1c",1,1);
                    break;
                case 2: // visible
					updateRoomState("1c",2,1);
                    break;
                case 3: // OSHIT IT'S MISSING; IT'S ON ITS WAY
					updateRoomState("1c",3,1);
					foxxyrunning = true;
                    break;
                case 4: // damn bro you ded
                    break;
                case 5: // "Curses, foiled again! [bangs door in anger]"
                    break;
            }
			animatronicStates[AIID].state=state;
			foxxytimer=0;
			break;
		default:
			alert("updateAIState() error - Invalid or no room name given!");
	}

	debuglog("AI "+animatronicStates[AIID].name+" state updated to "+state);
	return;
};

var updateRoomState = function(roomname,state){
	if(state=="") state = 0//parseInt(state);
	if((typeof roomname) != "string") return debuglog("Room name not a string!");

LaggedAPI.GEvents.next();

	switch(roomname) {
		case "1a":
			currRoomStates[0].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500);
				updatecurrentRoom("1a");
			};
			break;
		case "1b":
			currRoomStates[1].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500);
				updatecurrentRoom("1b");
			};
			break;
		case "1c":
			currRoomStates[2].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500);
				updatecurrentRoom("1c");
			};

			break;
		case "2a":
			currRoomStates[3].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500);
				updatecurrentRoom("2a");
			};
			break;
		case "2b":
			currRoomStates[4].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500);
				updatecurrentRoom("2b");
			};
			break;
		case "5":
			currRoomStates[5].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500);
				updatecurrentRoom("5");
			};
			break;
		case "3":
			currRoomStates[7].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500);
				updatecurrentRoom("3");
			};
			break;
		case "7":
			currRoomStates[6].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500);
				updatecurrentRoom("7");
			};
			break;
		case "4a":
			currRoomStates[8].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500);
				updatecurrentRoom("4a");
			};
			break;
		case "4b":
			currRoomStates[9].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500);
				updatecurrentRoom("4b");
			};
			break;
		case "6":
			currRoomStates[10].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500);
				updatecurrentRoom("6");
			};
			break;
		case "office":
			currRoomStates[7].roomstate=state;
			break;
		default:
			debuglog("Invalid or no room name given!");
			return;
	}

	debuglog("Camera "+roomname+" updated to state "+state);
	return ;
};

var leftornot = 0
var leftpos="-=300px"
var staticanim=[];
var randomcheck=1

function updatecurrentRoom(roomparameter) {

	if(roomparameter=="") return debuglog("updatecurrentRoom() error - No parameter given");

	// COMMENCE HACKY FIX FOR ROOM ANIMATION LEAKING TO NEXT ROOM, WILL NEED TO REUSE LATER
	if(play2aanimation==true){
		setTimeout(function(){
			eval("button"+roomparameter+"div.click();");
		},450);
		return;
	};
	// END

	sound.playSound("blip3.wav",0.5);
	currentRoom=roomparameter;
	currentroomstatetoset = 0
	currentroomstatetoset = searchForState(roomparameter);
	currentroomstatetoset2 = searchForRoomID(roomparameter);
	document.getElementById("roomname").src=roomnameimages[currentroomstatetoset2].src
	if(currentroomstatetoset== -1) return debuglog("updatecurrentRoom() error - Invalid parameter given");
	currentRoomID=searchForRoomID(roomparameter)
	if(roomparameter!="6"){
		updateRoomStateStatic(175);
		roomdiv.attr("src",roomImages[currentRoomID][currRoomStates[currentroomstatetoset2].roomstate].src);    //"graphics/rooms/"+currentRoom+"/"+currRoomStates[currentroomstatetoset2].roomstate+".png");
		document.getElementById("cameradisabled").style.display = "none";
	} else {
		document.getElementById("static").style.opacity = "2";
		document.getElementById("cameradisabled").style.display = "block";
	};
	roomdiv.css("left","0");
	if(rooms[currentRoomID].leftadjustment!==0){
//		roomdiv.css("left","-"+rooms[currentRoomID].leftadjustment+"%");
	};
	if(rooms[currentRoomID].movingcamera==false){
		roomdiv.removeClass("roomtest");
	}
	else {
		roomdiv.addClass("roomtest");
	};
	if(currentRoom!=="2a") {
		for(x=0;x<31;x++){
			clearTimeout(foxxyrunninganimationtimeout[x]);
		};
	}
	else if(foxxyrunning==true && currentRoom=="2a"){
		setTimeout(playFoxxyRunningAnimation,600);
	};

	if(currentRoom=="1c" && animatronicStates[3].state<3) {
		if(foxxytimer>1) foxxytimer-=2;
		if(foxxytimer<0) foxxytimer=0;
	};

	if(currentRoom==animatronicStates[1].currentRoom && feedopen == true) {
		updateAIState(1,1,false);
	};
	if(currentRoom==animatronicStates[2].currentRoom && feedopen == true) {
		updateAIState(2,1,false);
	};
	if(currentRoom==animatronicStates[0].currentRoom && feedopen == true) {
		if(animatronicStates[0].state==2){
			return;
		} else {
			updateAIState(0,1,false);
		};
	};
}

function updatePowerPercent() {
	switch(currentPowerUsage) {
				case 0:
					currentPower-=(0.141);
					break;
				case 1:
					currentPower-=(0.235);
					break;
				case 2:
					currentPower-=(0.341);
					break;
				case 3:
					currentPower-=(0.447);
					break;
				case 4:
					currentPower-=(0.553);
					break;
				default:
	};
    var digit1 = currentPower.toString()[0];
    var digit2 = currentPower.toString()[1];
    var digit3 = currentPower.toString()[2];
    digit1 = parseInt(digit1);
    digit2 = parseInt(digit2);
    digit3 = parseInt(digit3);
	if (currentPower<=0){
    	numberonediv.attr("src","graphics/rooms/office/cameraposition.webp");
    	numbertwodiv.attr("src","graphics/rooms/office/cameraposition.webp");
	} else if(currentPower<10) {
        numberonediv.attr("src",powerusagenumbersimage[digit1].src);
    	numbertwodiv.attr("src","graphics/rooms/office/cameraposition.webp");
	} else if (currentPower<100) {
        numberonediv.attr("src",powerusagenumbersimage[digit1].src);
		numbertwodiv.attr("src",powerusagenumbersimage[digit2].src);
    	numberthreediv.attr("src","graphics/rooms/office/cameraposition.webp");
    };
};

function updatePowerUsage() {
	powerusagediv.attr("src","graphics/camera/power"+(currentPowerUsage+1)+".png");
	if(currentPower<=0) gameoverPowerFailure();
}

function updateTime() {
    timeCounter++;
    if(timeCounter==85) {
    	timeCounter=0;
        currenthour++;
    }
    if(currenthour>0 && currenthour<6){
		timehourextradiv.attr("src",timehourimage[currenthour].src);
        document.getElementById("timehour").style.display="none"
    }
    else if(currenthour==6){
		endnight();
    };
};

function endnight() {
	clearInterval(mainThreadID);
	timer.stop();
	document.getElementById("mainmenu").style.display="none";
	document.getElementById("timekeeper").style.display="none";
	document.getElementById("openclosecamera").style.display="none";
	document.getElementById("power").style.display="none";
	document.getElementById("body").style.display="none";
	document.getElementById("nightover").style.display="block";
	document.getElementById("nightoveram").style.top="80px";
	document.getElementById("nightover5").style.top="80px";
	document.getElementById("nightover6").style.top="20px";

    // Update savegame-------------------------------------------------
	parsednight = parseInt(localStorage["fnaf-js-savegame.night"]); // To int so I can add 1
	if(parsednight!=7){
		parsednight+=1;													// Add 1

		if(parsednight==6 && localStorage["fnaf-js-savegame.stars"]=="0"){
			localStorage["fnaf-js-savegame.stars"]="1";
		} else if(parsednight==7 && parseInt(localStorage["fnaf-js-savegame.stars"])<2){
			localStorage["fnaf-js-savegame.stars"]="2";
		};
		if(difficulty20202020==true && parseInt(localStorage["fnaf-js-savegame.stars"])!=3){
			localStorage["fnaf-js-savegame.stars"]="3";
		};

		parsednight = parsednight.toString();							// Back to a string (not actually needed but meh)
		localStorage["fnaf-js-savegame.night"]=parsednight;				// Set savegame
		debuglog("Night won! Set night in saved game to: "+localStorage["fnaf-js-savegame.night"]);
	};
    // Update savegame-------------------------------------------------

	sound.playSound("chimes 2.wav");
	sound.stopAmbientSound();

	setTimeout(function(){
		nightover5div.animate({top: "140px"}, 6000, "linear",function() {
		// Animation complete.
		});
		nightover6div.animate({top: "80px"}, 6000, "linear",sound.playSound("CROWD_SMALL_CHIL_EC049202.wav"));
	},1500);
	setTimeout(function(){
		document.getElementById("nightover").style.display="none";
		document.getElementById("gameoverstaticimg").play();
		document.getElementById("mainmenustaticimg").style.display="block";
		mainmenu();
	},10000);
};

function gameoverstatic(timeout){
	if(typeof(timeout)=="undefined") timeout=900;
	setTimeout(function(){
		sound.stopSound();
		sound.stopAmbientSound();
		document.getElementById("gameoverstaticimg").style.display="block";
		document.getElementById("gameoverstaticimg").play();
		gameover();
	},timeout);

	LaggedAPI.APIAds.show('interstitial','fnaf-world','fnaf-world-game.jpg',function(response) {
	if(response.success) {
	console.log('ad finished');
	//createjs.Sound.setMute(false);
	}else {
	console.log('ad error, continue');
	//createjs.Sound.setMute(false);
	}
	});
};

function updatedifficulty(animatronic,negativepositive){
	switch(animatronic) {
		case "foxxy":
			if(negativepositive && foxydifficulty!=20){foxydifficulty++;} else if(negativepositive==false && foxydifficulty!=0){foxydifficulty--;};
			tempvar = ""+foxydifficulty;
			if(tempvar.length==2){
				tempvar1 = tempvar.substr(0,1);
				tempvar2 = tempvar.substr(1,2);
				document.getElementById("foxxydifficulty0").src="graphics/mainmenu/customnight/text/"+tempvar1+".png";
				document.getElementById("foxxydifficulty1").src="graphics/mainmenu/customnight/text/"+tempvar2+".png";
				document.getElementById("foxxydifficulty0").style.display="block";
			} else {
				document.getElementById("foxxydifficulty0").style.display="none";
				document.getElementById("foxxydifficulty1").src="graphics/mainmenu/customnight/text/"+tempvar+".png";
			};
			break;
		case "bunny":
			if(negativepositive && bunnydifficulty!=20){bunnydifficulty++;} else if(negativepositive==false && bunnydifficulty!=0){bunnydifficulty--;};
			tempvar = ""+bunnydifficulty;
			if(tempvar.length==2){
				tempvar1 = tempvar.substr(0,1);
				tempvar2 = tempvar.substr(1,2);
				document.getElementById("bunnydifficulty0").src="graphics/mainmenu/customnight/text/"+tempvar1+".png";
				document.getElementById("bunnydifficulty1").src="graphics/mainmenu/customnight/text/"+tempvar2+".png";
				document.getElementById("bunnydifficulty0").style.display="block";
			} else {
				document.getElementById("bunnydifficulty0").style.display="none";
				document.getElementById("bunnydifficulty1").src="graphics/mainmenu/customnight/text/"+tempvar+".png";
			};
			break;
		case "freddy":
			if(negativepositive && freddydifficulty!=20){freddydifficulty++;} else if(negativepositive==false && freddydifficulty!=0){freddydifficulty--;};
			tempvar = ""+freddydifficulty;
			if(tempvar.length==2){
				tempvar1 = tempvar.substr(0,1);
				tempvar2 = tempvar.substr(1,2);
				document.getElementById("freddydifficulty0").src="graphics/mainmenu/customnight/text/"+tempvar1+".png";
				document.getElementById("freddydifficulty1").src="graphics/mainmenu/customnight/text/"+tempvar2+".png";
				document.getElementById("freddydifficulty0").style.display="block";
			} else {
				document.getElementById("freddydifficulty0").style.display="none";
				document.getElementById("freddydifficulty1").src="graphics/mainmenu/customnight/text/"+tempvar+".png";
			};
			break;
		case "chica":
			if(negativepositive && chicadifficulty!=20){chicadifficulty++;} else if(negativepositive==false && chicadifficulty!=0){chicadifficulty--;};
			tempvar = ""+chicadifficulty;
			if(tempvar.length==2){
				tempvar1 = tempvar.substr(0,1);
				tempvar2 = tempvar.substr(1,2);
				document.getElementById("chicadifficulty0").src="graphics/mainmenu/customnight/text/"+tempvar1+".png";
				document.getElementById("chicadifficulty1").src="graphics/mainmenu/customnight/text/"+tempvar2+".png";
				document.getElementById("chicadifficulty0").style.display="block";
			} else {
				document.getElementById("chicadifficulty0").style.display="none";
				document.getElementById("chicadifficulty1").src="graphics/mainmenu/customnight/text/"+tempvar+".png";
			};
			break;
		default:
	};
};

function customizenight(){
	document.getElementById("gameoverstaticimg").pause();
	document.getElementById("mainmenustaticimg").style.display="none";
	document.getElementById("mainmenu").style.display="none";
	document.getElementById("night7interface").style.display="block"
	foxydifficulty=20;
	chicadifficulty=20;
	bunnydifficulty=20;
	freddydifficulty=20;
};

function mainmenu(){
	if(DEBUG_MODE){
		localStorage["fnaf-js-savegame.night"]="7";
		localStorage["fnaf-js-savegame.stars"]="3";
	};
	document.getElementById("amduatlogo").style.display="none";
	document.getElementById("mainmenu").style.display="block";
	tempvar = parseInt(localStorage["fnaf-js-savegame.stars"]);
	for(x=1;x<=tempvar;x++){
		document.getElementById("achievement"+x).style.display="block";
	};
	if(localStorage["fnaf-js-savegame.night"]!="1") {
		document.getElementById("continuebutton").style.display="block";
		document.getElementById("continuebuttonnight").style.display="block";
		document.getElementById("continuebuttonnightnumber").style.display="block";
		if(parseInt(localStorage["fnaf-js-savegame.night"])<5) {
			document.getElementById("continuebuttonnightnumber").src="graphics/mainmenu/littletext/"+localStorage["fnaf-js-savegame.night"]+".png";
		} else {
			document.getElementById("continuebuttonnightnumber").src="graphics/mainmenu/littletext/5.png";
			document.getElementById("6thnight").style.display="block";
			if(localStorage["fnaf-js-savegame.night"]=="7") document.getElementById("customnight").style.display="block";
		};
	};
	sound.playSound("static2.wav",0.3,true);
	clearInterval(mainmenuanimInterval1);
	sineStatic1();
	mainmenuanimInterval1 = setInterval(function(){
		rand=Math.random();
		if(rand>0.8) {
			for(x=0;x<(6);x++){
				//eval('setTimeout(function(){mainmenufazbearanimdiv.attr("src",mainmenufazbear['+(x & 3)+'].src);},(65*(Math.abs('+x+'+1))));');
				setTimeout(function(number){mainmenufazbearanimdiv.attr("src",mainmenufazbear[(number & 3)].src);},(65*( Math.abs(x+1))),x);
			};
		}
		else if(rand<0.8 && rand>0.6) {
			for(x=0;x<(7);x++){
				//eval('setTimeout(function(){mainmenufazbearanimdiv.attr("src",mainmenufazbear['+(x & 2)+'].src);},(45*(Math.abs('+x+'+1))));');
				setTimeout(function(number){mainmenufazbearanimdiv.attr("src",mainmenufazbear[(number & 2)].src);},(45*(Math.abs(x+1))));
			};
		} else if(rand<0.6 && rand>0.4) {
			for(x=0;x<(7);x++){
				//eval('setTimeout(function(){mainmenufazbearanimdiv.attr("src",mainmenufazbear['+(x & 1)+'].src);},(25*(Math.abs('+x+'+1))));');
				setTimeout(function(number){mainmenufazbearanimdiv.attr("src",mainmenufazbear[(number & 1)].src);},(25*(Math.abs(x+1))));
			};
		} else {
			mainmenufazbearanimdiv.attr("src",mainmenufazbear[0].src)
		};
	},1000);
};

function sineStatic1(){
	temprandom = Math.random();
	sineanimationtest = $('#mainmenustaticimg').animate({
		opacity: 0.6
	},80*(temprandom*100),sineStatic2);
};

function sineStatic2(){
	temprandom = Math.random();
	sineanimationtest = $('#mainmenustaticimg').animate({
		opacity: 0.3
	},80*(temprandom*100),sineStatic1);
};

function gameoverPowerFailure(){
	clearInterval(mainThreadID);
	sound.playSound("powerdown.wav");
    sound.stopAmbientSound();
	if(feedopen==true) {
		OpenCloseFeed();
	};
	if(rightdooropen==true) {
		playdooranimationright(1);
	};
	if(leftdooropen==true) {
		playdooranimationleft(1);
	};
	timer.stop();
	document.getElementById("fan").style.display="none";
	document.getElementById("timekeeper").style.display="none";
	document.getElementById("power").style.display="none";
	document.getElementById("doorbuttonsleft").style.display="none";
	document.getElementById("doorbuttonsright").style.display="none";
	document.getElementById("openclosecamera").style.display="none";
	document.getElementById("officemain").style.backgroundImage="url("+poweroutimg[0].src+")";
	original = 'setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+poweroutimg[1].src+")"},(450*5))'
	part1 = 'setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+poweroutimg[';
	part2 = '].src+")"},(450*';
	part3 = '))';
	duration = ((Math.random()*100)*0.66);
	delay = (duration*0.2);
	console.log(duration);
	setTimeout(function(){
        sound.playSound("freddy/poweroutmusic.ogg");
		for(x=1;x<duration;x++){ // The most stupid solution to a simple issue.
			eval(part1+(x & 1)+part2+x+part3);
		};						 // Sadly the only one that worked.
    },1000*delay);
	setTimeout(function(){
		sound.stopSound();
		sound.stopSound("freddy/poweroutmusic.ogg");
		playfreddygameoveranimation();
	},470*duration);
};

function gameover(){
	setTimeout(function(){
		document.getElementById("gameoverstaticimg").pause();
		document.getElementById("mainmenustaticimg").style.display="none";
		document.getElementById("mainmenu").style.display="none";
		document.getElementById("timekeeper").style.display="none";
		document.getElementById("openclosecamera").style.display="none";
		document.getElementById("power").style.display="none";
		document.getElementById("body").style.display="none";
		document.getElementById("gameover").style.display="block";
		document.getElementById("gameover").style.opacity="0";
		$("#gameover").animate({
			opacity: "1"
		},2000,function(){
//			eval('setTimeout(function(){location.reload();},5000)');
			eval('setTimeout(function(){resetgame();mainmenu();},5000)');
		});
		$("#gameoverstaticimg").animate({
			opacity: "0"
		},2000);
	},8000);
};

function resetgame(){
	document.getElementById("gameoverstaticimg").style.display="none";
	document.getElementById("gameoverstaticimg").style.opacity="2";
	document.getElementById("gameover").style.display="none";
	document.getElementById("mainmenu").style.display="none";
	document.getElementById("officemain").style.backgroundImage="url('graphics/rooms/office/0.webp')";
	document.getElementById("doorbuttonsleft").style.display="block";
	document.getElementById("doorbuttonsright").style.display="block";
	document.getElementById("doorright").style.display="block";
	document.getElementById("doorleft").style.display="block";
	document.getElementById("officecameraleft").style.display="block";
	document.getElementById("officecameraright").style.display="block";
	document.getElementById("mainmenustaticimg").style.display="block";
	setVariables();
};

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
};

if(!DEBUG_MODE) {setTimeout(introduction,1650);} else {mainmenu();};
