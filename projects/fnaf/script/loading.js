//
// loading.js
// The JS for loading the game (purely to reduce clutter)
// Like seriously, I doubt this improves perf or anything.
//
// Last updated - 12/08/2015

/**
 * @file Code for loading all files into variables
 * @author Sam Lynch
 * @version 1.0.0
 * @copyright (c) 2015 Amduat Games
 */
 
debuglog("Initializing loading.js...");

for(x=0;x<8;x++){
	transitionimages[x] = new Image();
	transitionimages[x].src = "graphics/transition/"+x+".webp";
};

/** @name sounds
* @description The array of sound names and Audio() objects */
var sounds=[
{name: "chimes 2.wav",file: new Audio()}, 					// 0
{name: "blip3.wav",file: new Audio()}, 						// 1
{name: "CAMERA_VIDEO_LOA_60105303.wav",file: new Audio()},	// 2
{name: "DOOR_POUNDING_ME_D0291401.wav",file: new Audio()},	// 3
{name: "knock2.wav",file: new Audio()}, 					// 4
{name: "pirate_song2.wav",file: new Audio()},				// 5
{name: "powerdown.wav",file: new Audio()},					// 6
{name: "put_down.wav",file: new Audio()},					// 7
{name: "run.wav",file: new Audio()},						// 8
{name: "SFXBible_12478.wav",file: new Audio()},				// 9
{name: "static2.wav",file: new Audio()},					// 10
{name: "windowscare.wav",file: new Audio()},				// 11
{name: "XSCREAM.wav",file: new Audio()},
{name: "XSCREAM2.wav",file: new Audio()},
{name: "freddy/poweroutmusic.ogg",file: new Audio()},
{name: "error.wav",file: new Audio()},
{name: "kitchen1.wav",file: new Audio()},
{name: "kitchen2.wav",file: new Audio()},
{name: "kitchen3.wav",file: new Audio()},
{name: "kitchen4.wav",file: new Audio()},
{name: "Laugh_Giggle_Girl_1d.wav",file: new Audio()},
{name: "Laugh_Giggle_Girl_2d.wav",file: new Audio()},
{name: "Laugh_Giggle_Girl_8d.wav",file: new Audio()},
{name: "deep steps.wav",file: new Audio()}
]; 

for(x=0;x<sounds.length;x++){
	debuglog("Loading "+sounds[x].name+" ...");
	sounds[x].file.src = "sounds/"+sounds[x].name;
	debuglog("Loaded "+sounds[x].file.src+" ...");
}; 

/** @function loadroomImages 
 * @description Loads room images specified in roomImagesIndex[]
*/
loadroomImages = function(){
	for(x=0;x<roomImagesIndex.length;x++){
		roomImages[x] = [];
	}
	for(x=0;x<roomImagesIndex.length;x++){
		for(y=0;y<roomImagesIndex[x].amountofImages;y++){
			roomImages[x][y] = new Image();
			roomImages[x][y].src = "graphics/rooms/"+roomImagesIndex[x].name+"/"+y+".webp"
			debuglog("Loaded %s",roomImages[x][y].src);
		}
	}
}

/** @function loadEverythingElse 
 * @description Loads all images to their arrays/variables in variables.js
*/
function loadEverythingElse(){
		if(foxydifficulty==20 && freddydifficulty==20 && chicadifficulty==20 && bunnydifficulty==20) difficulty20202020=true;
		playtransitiononanimation();
		document.getElementById("newgamebg").style.display="none";
		document.getElementById("mainmenustaticimg").style.display="none";
		document.getElementById("mainmenu").style.display="none";
		document.getElementById("night7interface").style.display="none"
		//if(localStorage["fnaf-js-savegame.night"]!="5" || localStorage["fnaf-js-savegame.night"]!="6" || localStorage["fnaf-js-savegame.night"]!="7"){ 
			document.getElementById("loadingicon").src=("graphics/loading/loading"+night+".png");
		//} else {
		//	document.getElementById("loadingicon").src=("graphics/loading/loading"+localStorage["fnaf-js-savegame.night"]+".png");
		//};
		document.getElementById("loadingicon").style.display="block";
	for(x=0;x<1;x++){
		officestates[x] = new Image();
		officestates[x].src = "graphics/rooms/office/"+x+".webp";
	};
	for(x=0;x<rooms.length;x++){
		roomnameimages[x] = new Image();
		roomnameimages[x].src = "graphics/camera/roomnames/"+rooms[x].name+".webp";
	};
	for(x=0;x<(3);x++){
		for(y=0;y<2;y++){
			if(!officelightstates[x]) officelightstates[x] = [];
			officelightstates[x][y] = new Image();
			officelightstates[x][y].src = "graphics/rooms/office/"+x+"_light"+yArray[y]+".webp";
		};
	};
	for(x=1;x<5;x++){
		buttonleftstates[x] = new Image();
		buttonleftstates[x].src = "graphics/rooms/office/buttons/buttonleft_"+x+".webp";
	};
	for(x=1;x<5;x++){
		buttonrightstates[x] = new Image();
		buttonrightstates[x].src = "graphics/rooms/office/buttons/buttonright_"+x+".webp";
	};
	for(x=0;x<14;x++){
		doorrightanim[x] = new Image();
		doorrightanim[x].src = "graphics/rooms/office/doors/right/"+x+".webp";
		doorleftanim[x] = new Image();
		doorleftanim[x].src = "graphics/rooms/office/doors/left/"+x+".webp";
	};
	for(x=1;x<6;x++){
		powerusageimage[x] = new Image();
		powerusageimage[x].src = "graphics/camera/power"+x+".png";
	};
	for(x=0;x<10;x++){
		powerusagenumbersimage[x] = new Image();
		powerusagenumbersimage[x].src = "graphics/camera/ui/powernumbers/"+x+".png";
	};
	for(x=0;x<7;x++){
		timehourimage[x] = new Image();
		timehourimage[x].src = "graphics/camera/ui/time"+x+".png";
	};
	for(x=0;x<10;x++){
		camerafeedanimationimage[x] = new Image();
		camerafeedanimationimage[x].src = "graphics/camera/camerafeedanimation/"+x+".webp";
	};
	for(x=0;x<2;x++){
		room2aimage[x] = new Image();
		room2aimage[x].src = "graphics/rooms/2a/"+x+".webp";
	};
	for(x=0;x<31;x++){
		room2afoxxyanim[x] = new Image();
		room2afoxxyanim[x].src = "graphics/rooms/2a/foxxy/"+x+".webp";
	};
	for(x=1;x<4;x++){
		fananim[0+x] = new Image();
		fananim[0+x].src = "graphics/rooms/office/fan_"+x+".webp";
	};
	for(x=0;x<21;x++){
		foxxyofficeanim[x] = new Image();
		foxxyofficeanim[x].src = "graphics/rooms/office/foxxy/"+x+".webp";
	};
	for(x=0;x<2;x++){
		poweroutimg[x] = new Image();
		poweroutimg[x].src = "graphics/rooms/office/powerout"+x+".webp";
	};
	for(x=0;x<20;x++){
		freddyanimationgameover[x] = new Image();
		freddyanimationgameover[x].src = "graphics/gameover/freddy/"+x+".webp";
	};
	for(x=0;x<31;x++){
		freddyofficeanimationgameover[x] = new Image();
		freddyofficeanimationgameover[x].src = "graphics/gameover/freddyoffice/"+x+".webp";
	};
	for(x=0;x<22;x++){
		bonnyanimationgameover[x] = new Image();
		bonnyanimationgameover[x].src = "graphics/gameover/bonny/"+x+".webp";
	};
	for(x=0;x<16;x++){
		chicaanimationgameover[x] = new Image();
		chicaanimationgameover[x].src = "graphics/gameover/chica/"+x+".webp";
	};
	setTimeout(function(){
		clearInterval(mainmenuanimInterval1);
		document.getElementById("loadingicon").style.display="none";
		document.getElementById("timekeeper").style.display="block";
		document.getElementById("openclosecamera").style.display="block";
		document.getElementById("power").style.display="block";
		document.getElementById("body").style.display="block";
		mainThreadID = setInterval('mainThread()', 1000);
		var recordanimId = setInterval('recordTick()', 1000);
		if(!DEBUG_MODE){
			ambiance1.start("ambiancetrack1");
			ambiance2.start("ambiancetrack2");
			ambiance1.volume(0.3);
			ambiance2.volume(0.3);
		};
		timer = $.timer(function() {
		   setDivImgFan()
			}, 91, true);
	},3500);
};
for(x=0;x<4;x++){
	mainmenufazbear[x] = new Image();
	mainmenufazbear[x].src = "graphics/mainmenu/"+x+".webp";
};
