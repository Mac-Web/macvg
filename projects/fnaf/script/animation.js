//
// animation.js
// The JS for animation functions
//
// Last updated - 12/08/2015

/**
 * @file Code for animations
 * @author Sam Lynch
 * @version 1.0.0
 * @copyright (c) 2015 Amduat Games
 */
 
debuglog("Initializing animation.js...");

/** @function universalAnimation 
 * @description Applies any animation to a target div (NOT WORKING)
 * @deprecated
 * @param {string} targetdiv ID of target div
 * @param {int} frames Number of frames
*/
function universalAnimation(targetdiv,frames){
	if((typeof targetdiv)=="undefined" || (typeof targetdiv)!="string") return debuglog("universalAnimation() error - invalid target div!");
		
	targetdivhandle = document.getElementById(targetdiv);
	
	targetdivhandle.style.display="block";
	for(x=0;x<=(frames);x++){
		//eval('setTimeout(function(){document.getElementById("'+targetdiv+'").src=""+transitionimages['+x+'].src+"";},(65*'+x+'));');
		setTimeout(function(number,div){
			document.getElementById(div).src=""+transitionimages[number].src;
		},(65*x),x,targetdiv);
	};
	setTimeout(function(){
		targetdivhandle.style.display="none";
	},(500));
};

/** @function introduction 
 * @description Plays the introduction animation and goes to the main menu.
*/
function introduction(){
	playtransitiononanimation();
	$('#amduatlogo').animate({
		opacity: 1
	},200,function(){
		setTimeout(function(){
			eval('playtransitiononanimation();$("#amduatlogo").animate({opacity: 0},200,function(){setTimeout(mainmenu,2000);});')
			//playtransitiononanimation();
			//$("#amduatlogo").animate({opacity: 0},200,function(){setTimeout(mainmenu,2000);});
		}, 5500);
	});
};

/** @function playtransitiononanimation 
 * @description Plays the transition animation to go from main menu to loading screen
*/
function playtransitiononanimation(){
	transitiondiv.style.display="block";
	for(x=0;x<8;x++){
		//eval('setTimeout(function(){document.getElementById("transistionanimation").src=""+transitionimages['+x+'].src+"";},(65*'+x+'));');
		setTimeout(function(number){
			document.getElementById("transistionanimation").src=transitionimages[number].src;
		},(65*+x),x);
	};
	setTimeout(function(){
		transitiondiv.style.display="none";
	},(500));
};

/** @function playfreddygameoveranimation 
 * @description Plays the animation of the animatronic killing the player
 * @param {string} animatronic Name of the animatronic to update
*/
function playfreddygameoveranimation(animatronic){
	if((typeof animatronic)=="undefined") animatronic="freddy";
	if(feedopen == true) OpenCloseFeed();
	switch(animatronic) {
		case "freddyoffice":
			document.getElementById("fan").style.display="none";
			document.getElementById("officemain").style.backgroundImage="none";
			document.getElementById("doorbuttonsleft").style.display="none";
			document.getElementById("doorbuttonsright").style.display="none";
			document.getElementById("doorright").style.display="none";
			document.getElementById("doorleft").style.display="none";
			document.getElementById("officecameraleft").style.display="none";
			document.getElementById("officecameraright").style.display="none";
			document.getElementById("openclosecamera").style.display="none";
			sound.playSound("XSCREAM.wav",0.05);
			for(x=0;x<31;x++){
				//eval('setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+freddyofficeanimationgameover['+x+'].src+")";},(55*'+x+'));');
				setTimeout(function(number){
					document.getElementById("officemain").style.backgroundImage="url("+freddyofficeanimationgameover[number].src+")";
				},(55*x),x);
			};
			gameoverstatic(1700);
			break;
		case "freddy":
			document.getElementById("officemain").style.backgroundImage="none";
			document.getElementById("doorbuttonsleft").style.display="none";
			document.getElementById("doorbuttonsright").style.display="none";
			document.getElementById("doorright").style.display="none";
			document.getElementById("doorleft").style.display="none";
			document.getElementById("officecameraleft").style.display="none";
			document.getElementById("officecameraright").style.display="none";
			document.getElementById("openclosecamera").style.display="none";
			sound.playSound("XSCREAM.wav",0.05);
			for(x=0;x<20;x++){
				//eval('setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+freddyanimationgameover['+x+'].src+")";},(45*'+x+'));');
				setTimeout(function(number){
					document.getElementById("officemain").style.backgroundImage="url("+freddyanimationgameover[number].src+")";
				},(45*x),x);
			};
			gameoverstatic();
			break;
		case "bonny":
			document.getElementById("fan").style.display="none";
			document.getElementById("doorright").style.display="none";
			document.getElementById("doorleft").style.display="none";
			sound.playSound("XSCREAM.wav",0.05);
			for(x=0;x<22;x++){
				//eval('setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+bonnyanimationgameover['+x+'].src+")";},(45*'+x+'));');
				setTimeout(function(number){
					document.getElementById("officemain").style.backgroundImage="url("+bonnyanimationgameover[number].src+")";
				},(45*x),x);
			};
			setTimeout(function(){gameoverstatic();},275);
			break;
		default:
		case "chica":
			document.getElementById("fan").style.display="none";
			document.getElementById("doorright").style.display="none";
			document.getElementById("doorleft").style.display="none";
			sound.playSound("XSCREAM.wav",0.05);
			for(x=0;x<16;x++){
				//eval('setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+chicaanimationgameover['+x+'].src+")";},(45*'+x+'));');
				setTimeout(function(number){
					document.getElementById("officemain").style.backgroundImage="url("+chicaanimationgameover[number].src+")";
				},(45*x),x);
			};
			setTimeout(function(){gameoverstatic();},275);
			break;
	};
	clearInterval(mainThreadID);
};

function playfoxxyofficeanimation(){
	if(feedopen==true) {
		OpenCloseFeed();
	}; 
	document.getElementById("officecameraleft").style.display="none";
	document.getElementById("officecameraright").style.display="none";
	document.getElementById("openclosecamera").style.display="none";
	document.getElementById("doorleft").style.display="none";
	sound.playSound("XSCREAM.wav",0.05);
	for(x=0;x<21;x++){
	//	eval('foxxyofficeanimtimeout[x] = setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+foxxyofficeanim['+x+'].src+")";},(35*'+x+'));');
		foxxyofficeanimtimeout[x] = setTimeout(function(number){
			document.getElementById("officemain").style.backgroundImage="url("+foxxyofficeanim[number].src+")";
			},(35*x),x
		);
	};
	clearInterval(mainThreadID);
	setTimeout(function(){
		gameoverstatic();
		},(2350));
};

function recordTick() {
	recorddiv.toggle();
	if(showrecord==true) {
		showrecord=false;
	}
	else {
		showrecord=true;
	};
};

function setDivImgFan(){
//	document.getElementById(elementID).src=pathtofile+"_"+frame2+".png"
	setTimeout(function(){
		fandiv.attr("src",fananim[1].src);
	},30);
	setTimeout(function(){
		fandiv.attr("src",fananim[2].src);
	},60);
	setTimeout(function(){
		fandiv.attr("src",fananim[3].src);
	},90);
};

function playpoweroutageanimation(duration){
	if(duration=="") duration = 60;
	document.getElementById("openclosecamera").style.display="none";
	document.getElementById("fan").style.display="none";
	document.getElementById("officemain").style.backgroundImage="url("+poweroutimg[0].src+")";
	for(x=0;x<duration;x++){
		//eval('setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+poweroutimg['+(x & 1)+'].src+")";},(105*'+x+'));');
		setTimeout(function(number){
			document.getElementById("officemain").style.backgroundImage="url("+poweroutimg[(number & 1)].src+")";
		},(105*x),x);
	};
	clearInterval(mainThreadID);
};

function playFoxxyRunningAnimation(){
	sound.playSound("run.wav");
	for(x=0;x<31;x++){
		//eval('foxxyrunninganimationtimeout[x] = setTimeout(function(){roomdiv.attr("src",room2afoxxyanim['+x+'].src);},(35*'+x+'));');
		foxxyrunninganimationtimeout[x] = setTimeout(function(number){
		roomdiv.attr("src",room2afoxxyanim[number].src);
		},(35*x),x);
	};
	setTimeout(function(){
		foxxyrunning=false;
		if(leftdooropen==true) sound.playSound("knock2.wav",1);
			animatronicStates[3].state=4;
		},(3350));
};


function playdooranimationright(inReverse){
	if(inReverse==0) {
		for(x=0;x<(14);x++){
			//eval('setTimeout(function(){doorrightdiv.attr("src",doorrightanim['+x+'].src);},(30*('+x+'+1)));')
			setTimeout(function(number){doorrightdiv.attr("src",doorrightanim[number].src);},(30*(x+1)),x);
		}
	}
	else if(inReverse==1) {
		for(x=13;x>=(0);x--){
			//eval('setTimeout(function(){doorrightdiv.attr("src",doorrightanim['+x+'].src);},(20*(Math.abs('+x+'-13))));')
			setTimeout(function(number){doorrightdiv.attr("src",doorrightanim[number].src);},(20*(Math.abs(x-13))),x);
		}
	}
}

function playcamerafeedanimation(inReverse){
	if(inReverse==0) {
		camerafeedanimationdiv.css("display","block");
		for(x=0;x<(10);x++){
			//eval('setTimeout(function(){camerafeedanimationdiv.attr("src",camerafeedanimationimage['+x+'].src);},(30*('+x+'+1)));')
			setTimeout(function(number){camerafeedanimationdiv.attr("src",camerafeedanimationimage[number].src);},(30*(x+1)),x);
			//eval('setTimeout(function(){camerafeedanimationdiv.css("display","none");},(330));')
			setTimeout(function(){camerafeedanimationdiv.css("display","none");},(330));
		}
	}
	else if(inReverse==1) {
		camerafeedanimationdiv.css("display","block");
		for(x=9;x>=(0);x--){
			//eval('setTimeout(function(){camerafeedanimationdiv.attr("src",camerafeedanimationimage['+x+'].src);},(20*(Math.abs('+x+'-9))));')
			setTimeout(function(number){camerafeedanimationdiv.attr("src",camerafeedanimationimage[number].src);},(20*(Math.abs(x-9))),x);
			//eval('setTimeout(function(){camerafeedanimationdiv.css("display","none");},(200));')
			setTimeout(function(){camerafeedanimationdiv.css("display","none");},(200));
		}
	};
}

// lol this is only used for one bloody room...
function playroomanimation(room,randomnumber){
	switch(room) {
		case "2a":
			for(x=0;x<(9);x++){
				if(randomnumber>0.5) {
					//eval('setTimeout(function(){roomdiv.attr("src",room2aimage['+(x & 1)+'].src);},(45*(Math.abs('+x+'+1))));');
					setTimeout(function(number){roomdiv.attr("src",room2aimage[(number & 1)].src);},(45*(Math.abs(x+1))),x);
				}
				else {
					//eval('setTimeout(function(){roomdiv.attr("src",room2aimage['+(x & 1)+'].src);},(15*(Math.abs('+x+'+1))));');
					setTimeout(function(number){roomdiv.attr("src",room2aimage[(number & 1)].src);},(15*(Math.abs(x+1))),x);
				}
			}
            break;
		default:
			alert("Invalid or no room name given!");
	}
};

function playdooranimationleft(inReverse){
	if(inReverse==0) {
		for(x=0;x<(14);x++){
			//eval('setTimeout(function(){doorleftdiv.attr("src",doorleftanim['+x+'].src);},(30*('+x+'+1)));')
			setTimeout(function(number){doorleftdiv.attr("src",doorleftanim[number].src);},(30*(x+1)),x);
		}
	}
	else if(inReverse==1) {
		for(x=13;x>=(0);x--){
			//eval('setTimeout(function(){doorleftdiv.attr("src",doorleftanim['+x+'].src);},(20*(Math.abs('+x+'-13))));')
			setTimeout(function(number){doorleftdiv.attr("src",doorleftanim[number].src);},(20*(Math.abs('+x+'-13))),x);
		}
	}
}