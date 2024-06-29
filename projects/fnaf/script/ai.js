//
// ai.js
// The JS for ai
//
// Last updated - 12/08/2015

/**
 * @file Code for AI operations
 * @author Sam Lynch
 * @version 1.0.0
 * @copyright (c) 2015 Amduat Games
 */
 
debuglog("Initializing ai.js...");

/** @function updateBunnyAI 
 * @description Updates AI of Bonnie
*/
function updateBunnyAI() {
	switch(animatronicStates[1].state) {
		case 0:  // unseen
		//	if(animatronicStates[1].currentRoom=="1b") return;
			bunnytimer++;
			debuglog("bunnytimer = "+bunnytimer);
			if(animatronicStates[1].currentRoomArray==0) {
				if(leftlighton==true) {
					updateAIState(1,1,false);
				} else {
					updateAIState(1,3,false);
					return;
				};
			};
			if(bunnytimer>=bunnydifficultyarray[bunnydifficulty]){
			//	updateRoomState(roomname,state,timeout);
			//	animatronicStates[1].state=2;
				updateAIState(1,2);
			}
			break;
		case 1:  // seen
			if(currentRoom!=animatronicStates[1].currentRoom || feedopen == false) {
				if(animatronicStates[1].currentRoomArray==0 && leftlighton==true) {
					updateAIState(1,1,false);
					return;
				} else {
					updateAIState(1,0,false);
					return;
				};
			};
			break;
		case 2:  // moving
			debuglog("bunnytimer = "+bunnytimer);
			if((animatronicStates[0].currentRoomArray)==5) return;
			if(animatronicStates[1].currentRoomArray==0) {
				updateAIState(1,3);
				return;
			};
//			if((Math.random()*100)<=bunnyChanceToMoveCloser[bunnydifficulty]){
			if(1==1){
				animatronicStates[1].currentRoomArray-=1
				debuglog(roomClosenessBunny[animatronicStates[1].currentRoomArray].name);
				if((animatronicStates[1].currentRoomArray + 1)==6) {
                    if((animatronicStates[0].currentRoomArray)!=6){
						updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray+1].name,1);
                    } else {
						updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray+1].name,2);
                    };
				} else {
					updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray+1].name,0);
				};
				if(animatronicStates[1].currentRoomArray==4 || animatronicStates[1].currentRoomArray==5){
					if((Math.random()*100)<=20){
						updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray].name,2);
					} else {
						updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray].name,1);
					};
				} else {
					updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray].name,2);
				};
				animatronicStates[1].currentRoom=roomClosenessBunny[animatronicStates[1].currentRoomArray].name
				debuglog("closer!");
				if(currentRoom!=animatronicStates[1].currentRoom || feedopen == false) {
					updateAIState(1,0);
				} else {
					updateAIState(1,1);
				};
				if(animatronicStates[1].currentRoom=="office") updateAIState(1,3);
			};
			break;
		case 3:  // at office door
			bunnytimer++;
			debuglog("bunnytimer = "+bunnytimer);
			if(bunnytimer<=9 && leftlighton==true){
				updateAIState(1,1,false);
			};
			if(bunnytimer<=9 && leftdooropen==true){
			//	currentPower-=(0.775);
			} else if(bunnytimer>=9 && leftdooropen==false){
				updateAIState(1,4);
			} else if(bunnytimer>=10 && leftdooropen==true){
				if(animatronicStates[0].currentRoomArray!=5){
					updateAIState(1,0);
					updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray].name,2);
					animatronicStates[1].currentRoomArray=5;
					updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray].name,2);
					animatronicStates[1].currentRoom=roomClosenessBunny[animatronicStates[1].currentRoomArray].name;
					debuglog("returning to room 1b");
				} else {
					updateAIState(1,0);
					updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray].name,2);
					animatronicStates[1].currentRoomArray=4;
					updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray].name,2);
					animatronicStates[1].currentRoom=roomClosenessBunny[animatronicStates[1].currentRoomArray].name;
					debuglog("returning to room 1b");
				};
			};
			break;
		case 4:  // dead
			playfreddygameoveranimation("bonny");
			updateAIState(1,1);
			break;
		default:
	}
};

/** @function updateChicaAI 
 * @description Updates AI of Chica
*/
function updateChicaAI() {
	switch(animatronicStates[0].state) {
		case 0:  // unseen
		//	if(animatronicStates[1].currentRoom=="1b") return;
			chicatimer++;
			debuglog("chicatimer = "+chicatimer);
			if(animatronicStates[0].currentRoomArray==0) {
				if(leftlighton==true) {
					updateAIState(0,1,false);
				} else {
					updateAIState(0,3,false);
					return;
				};
			};
			if(chicatimer>=chicadifficultyarray[chicadifficulty]){
			//	updateRoomState(roomname,state,timeout);
			//	animatronicStates[1].state=2;
				updateAIState(0,2);
			};
			break;
		case 1:  // seen
			if(currentRoom!=animatronicStates[0].currentRoom || feedopen == false) {
				if(animatronicStates[0].currentRoomArray==0 && rightlighton==true) {
					updateAIState(0,1,false);
					return;
				} else {
					updateAIState(0,0,false);
					return;
				};
			};
			break;
		case 2:  // moving
			debuglog("chicatimer = "+chicatimer);
		//	if((animatronicStates[1].currentRoomArray)==5) return;
			if(animatronicStates[0].currentRoomArray==0) {
				updateAIState(0,3);
				return;
			};
//			if((Math.random()*100)<=chicaChanceToMoveCloser[chicadifficulty]){
			if(1==1){
		//		updateAIPosition(1,1,roomClosenessBunny[3].name,1,0)
				animatronicStates[0].currentRoomArray-=1
				debuglog(roomClosenessChica[animatronicStates[0].currentRoomArray].name);
				if((animatronicStates[0].currentRoomArray + 1)==6) {
                    if((animatronicStates[1].currentRoomArray)!=5){
						updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray+1].name,1);
                    } else {
						updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray+1].name,1);
						animatronicStates[0].currentRoomArray-=1
						updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray+2].name,3);
                    };
				//} else {
				//	updateRoomState(roomClosenessChica[animatronicStates[1].currentRoomArray+1].name,0);
				};
				if(animatronicStates[0].currentRoomArray==5){
					if((Math.random()*100)<=20){
						updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray].name,4);
                    } else {
						updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray].name,3);
					};
				} else if(animatronicStates[0].currentRoomArray==4){
					if((Math.random()*100)<=20){
						updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray].name,2);
                    } else {
						updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray].name,1);
                    };   
                } else {
					updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray].name,2);
				};
				animatronicStates[0].currentRoom=roomClosenessChica[animatronicStates[0].currentRoomArray].name
				debuglog("closer!");
				if(currentRoom!=animatronicStates[0].currentRoom || feedopen == false) {
					updateAIState(0,0);
				} else {
					updateAIState(0,1);
				};
				if(animatronicStates[0].currentRoom=="office") updateAIState(0,3);
				if(animatronicStates[0].currentRoom=="6"){sound.playSound("kitchen"+(randomIntFromInterval(1,4))+".wav",0.6);}
			};
			break;
		case 3:  // at office door
			chicatimer++;
			debuglog("chicatimer = "+chicatimer);
			if(chicatimer<=9 && leftlighton==true){
				updateAIState(1,1,false);
			};
			if(chicatimer<=9 && rightdooropen==true){
			//	currentPower-=(0.775);
			} else if(chicatimer>=9 && rightdooropen==false){
				updateAIState(0,4);
			} else if(chicatimer>=10 && rightdooropen==true){
				if(animatronicStates[1].currentRoomArray!=5){
					updateAIState(0,0);
					updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray].name,2);
					animatronicStates[0].currentRoomArray=4;
					updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray].name,2);
					animatronicStates[0].currentRoom=roomClosenessChica[animatronicStates[0].currentRoomArray].name;
					debuglog("returning to room 1b");
				} else {
					updateAIState(0,0);
					updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray].name,2);
					animatronicStates[0].currentRoomArray=3;
					updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray].name,2);
					animatronicStates[0].currentRoom=roomClosenessChica[animatronicStates[0].currentRoomArray].name;
					debuglog("returning to room 7");
				};
			};
			break;
		case 4:  // dead
			playfreddygameoveranimation("chica");
			updateAIState(0,1);
			break;
		default:
	}
};

/** @function updateFoxxyAI 
 * @description Updates AI of Foxxy
*/
function updateFoxxyAI() {
	switch(animatronicStates[3].state) {
		case 0: 
			foxxytimer++;
			if(foxxytimer>=foxydifficultyarray[foxydifficulty]){
				updateAIState(3,1);
				sound.playSound("pirate_song2.wav",0.01);
			}
			break;
		case 1: 
			foxxytimer++;
			if(foxxytimer>=foxydifficultyarray[foxydifficulty]){
				updateAIState(3,2);
				sound.playSound("pirate_song2.wav",0.01);
			};
			break;
		case 2: 
			foxxytimer++;
			if(foxxytimer>=foxydifficultyarray[foxydifficulty]){
				updateAIState(3,3);
				sound.playSound("pirate_song2.wav",0.01);
			}
			break;
		case 3: 
			foxxytimer++;
			if(foxxytimer>=6 && leftdooropen==false){
				if(feedopen==true){
					OpenCloseFeed();
				};
				playfoxxyofficeanimation();
			} else if(foxxytimer<5 && leftdooropen==true){
				updateAIState(3,4);
			};
			break;
		case 4: 
			foxxytimer++;
			if(foxxytimer<=9 && leftdooropen==true){
				currentPower-=(0.775);
			} else if(foxxytimer<=9 && leftdooropen==false){
				playfoxxyofficeanimation();
			} else if(foxxytimer>=10 && leftdooropen==true){
				updateAIState(3,0);
			};
			break;
		default:
	}
};

/** @function updateFreddyAI 
 * @description Updates AI of Freddy
*/
function updateFreddyAI() {
	switch(animatronicStates[2].state) {
		case 0:  // unseen
			freddytimer++;
			debuglog("freddytimer = "+freddytimer);
			if(animatronicStates[2].currentRoomArray==0) {
				debuglog("FREDDY HAS REACHED THE OFFICE");
			};
			if(freddytimer>=freddydifficultyarray[freddydifficulty]){
			//	updateRoomState(roomname,state,timeout);
			//	animatronicStates[1].state=2;
				updateAIState(2,2);
			};
			break;
		case 1:  // seen
			if(currentRoom!=animatronicStates[2].currentRoom || feedopen == false) {
				//if(animatronicStates[2].currentRoomArray==0 && rightlighton==true) {
					updateAIState(2,0,false);
					//return;
				} else {
					updateAIState(2,1,false);
				//	return;
				};
			break;
		case 2:  // moving
			debuglog("freddytimer = "+freddytimer);
			if(animatronicStates[2].currentRoomArray==1) {
				updateAIState(2,3);
				debuglog("FREDDY HAS REACHED THE OFFICE");
				return;
			};
			if(1==1){
				animatronicStates[2].currentRoomArray-=1
				debuglog(roomClosenessFreddy[animatronicStates[2].currentRoomArray].name);
				if((animatronicStates[2].currentRoomArray + 1)==6) {
					debuglog("FREDDY HAS LEFT THE STAGE");
					updateRoomState(roomClosenessFreddy[animatronicStates[2].currentRoomArray+1].name,5);
				} else {
					updateRoomState(roomClosenessFreddy[animatronicStates[2].currentRoomArray+1].name,0);
				};
				if(animatronicStates[2].currentRoomArray==5){
					if(animatronicStates[0].currentRoomArray==5){
						animatronicStates[2].currentRoomArray-=1;
						updateRoomState(roomClosenessFreddy[animatronicStates[2].currentRoomArray].name,5);
					} else {
						updateRoomState(roomClosenessFreddy[animatronicStates[2].currentRoomArray].name,5);
					};
				} else if(animatronicStates[2].currentRoomArray==4){
					updateRoomState(roomClosenessFreddy[animatronicStates[2].currentRoomArray].name,3);
                } else if(animatronicStates[2].currentRoomArray==1){
					updateRoomState(roomClosenessFreddy[animatronicStates[2].currentRoomArray].name,4);
                } else {
					updateRoomState(roomClosenessFreddy[animatronicStates[2].currentRoomArray].name,3);
				};
				if(animatronicStates[0].currentRoomArray==animatronicStates[2].currentRoomArray){
					updateRoomState(roomClosenessFreddy[animatronicStates[2].currentRoomArray].name,1);
					animatronicStates[2].currentRoomArray-=1;
					updateRoomState(roomClosenessFreddy[animatronicStates[2].currentRoomArray].name,3);
				};
				animatronicStates[2].currentRoom=roomClosenessFreddy[animatronicStates[2].currentRoomArray].name
				debuglog("closer!");
				if(currentRoom!=animatronicStates[2].currentRoom || feedopen == false) {
					updateAIState(2,0);
				} else {
					updateAIState(2,1);
				};
				if(animatronicStates[2].currentRoom=="4b"){
					updateAIState(2,3);
				} else if(animatronicStates[2].currentRoom=="6"){
					sound.playSound("kitchen"+(randomIntFromInterval(1,4))+".wav",0.6);
				};
				if(Math.random()<0.84){ 
					// play a sound
					whatsound = randomIntFromInterval(1,4);
					switch(whatsound){
						case 1:
							sound.playSound("Laugh_Giggle_Girl_8d.wav",0.5);
						break;
						case 2:
							sound.playSound("Laugh_Giggle_Girl_2d.wav",0.5);
						break;
						case 3:
							sound.playSound("Laugh_Giggle_Girl_1d.wav",0.5);
						break;
						case 4:
							sound.playSound("deep steps.wav",0.5);
						break;
					};
				};
			};
			break;
		case 3:  // at door outside office
			freddytimer++;
			debuglog("freddytimer = "+freddytimer);
			if(freddytimer<=7 && rightdooropen==true){
				//keep the door closed for 4 seconds lest you get fucked
			} else if(freddytimer>=7 && rightdooropen==false){
				//door was not closed. Shame.
				updateRoomState(roomClosenessFreddy[animatronicStates[2].currentRoomArray].name,0);
				animatronicStates[2].currentRoomArray=0;
				updateAIState(2,4);
			} else if(freddytimer>=8 && rightdooropen==true){
				//the door was shut for 8 seconds so he flees.
				if(animatronicStates[1].currentRoomArray!=5 && animatronicStates[0].currentRoomArray!=5){
					updateAIState(2,0);
					updateRoomState(roomClosenessFreddy[animatronicStates[2].currentRoomArray].name,0);
					animatronicStates[2].currentRoomArray=5;
					updateRoomState(roomClosenessFreddy[animatronicStates[2].currentRoomArray].name,5);
					animatronicStates[2].currentRoom=roomClosenessFreddy[animatronicStates[2].currentRoomArray].name;
					debuglog("Returning Freddy to room 1b");
				} else if(animatronicStates[0].currentRoomArray!=4){
					updateAIState(2,0);
					updateRoomState(roomClosenessFreddy[animatronicStates[2].currentRoomArray].name,0);
					animatronicStates[2].currentRoomArray=4;
					updateRoomState(roomClosenessFreddy[animatronicStates[2].currentRoomArray].name,3);
					animatronicStates[2].currentRoom=roomClosenessFreddy[animatronicStates[2].currentRoomArray].name;
					debuglog("Returning Freddy to room 7");
				} else {
					updateAIState(2,0);
					updateRoomState(roomClosenessFreddy[animatronicStates[2].currentRoomArray].name,0);
					animatronicStates[2].currentRoomArray=3;
					updateRoomState(roomClosenessFreddy[animatronicStates[2].currentRoomArray].name,2);
					animatronicStates[2].currentRoom=roomClosenessFreddy[animatronicStates[2].currentRoomArray].name;
					debuglog("Returning Freddy to room 6");
				};
			};
			break;
		case 4:  // inside office/dead
			if(freddytimer==0){
				animatronicStates[2].currentRoomArray = 0;
				animatronicStates[2].currentRoom=roomClosenessFreddy[animatronicStates[2].currentRoomArray].name;
			};
			freddytimer++;
			debuglog("freddytimer = "+freddytimer);
			if(freddytimer>=14){
				//dead
				playfreddygameoveranimation("freddyoffice")
			};
			break;
		default:
	}
};