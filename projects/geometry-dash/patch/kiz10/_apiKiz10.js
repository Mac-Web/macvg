var refi=false;var urif=window.location.href;const str=urif;const flagKiz='?kiz10';if(str.indexOf(flagKiz)>-1)
{console.log("True No Redirect");}else
{refi=true;console.log("False Redirect : "+urif+"?kiz10");}
if(!refi&&window.location.href=="")
{}
var _apiKiz10continue=1;var isInIFrame=(window.location!=window.parent.location);if(isInIFrame==true)
{console.log("In IFrame");_apiKiz10continue=0;if(refi)
{}}
else
{console.log("Not in IFrame");_apiKiz10continue=0;if(refi)
{window.location.href==urif+"?kiz10";}}
function getGlobalObject(name)
{if(document.getElementById('c2canvas'))
{var runtime=document.getElementById('c2canvas').c2runtime;for(var p in runtime)
{if(Object.prototype.hasOwnProperty.call(runtime,p))
{var prop=runtime[p];if(prop===undefined)continue;if(prop===null)continue;if(typeof prop!=='object')continue;if(prop.length===undefined)continue;for(var i=0;i<prop.length;i++)
{if(prop[i].parent!==undefined&&prop[i].data!==undefined&&prop[i].sheet!==undefined&&prop[i].name!==undefined)
{if(prop[i].name===name)
{return prop[i];}}else
{break;}}}}}
return null;}
function setGlobalVar(name,value)
{var g=getGlobalObject(name);if(g===null)return;g.data=value;}
function getGlobalVar(name)
{var g=getGlobalObject(name);if(g===null)return 0;return g.data;}
function createCookie(e,o,t){if(t){var n=new Date;n.setTime(n.getTime()+24*t*60*60*1e3);var r="; expires="+n.toGMTString()}else var r="";document.cookie=e+"="+o+r+"; path=/"}function readCookie(e){for(var o=e+"=",t=document.cookie.split(";"),n=0;n<t.length;n++){for(var r=t[n];" "==r.charAt(0);)r=r.substring(1,r.length);if(0==r.indexOf(o))return r.substring(o.length,r.length)}return null}function eraseCookie(e){createCookie(e,"",-1)}
var _hex=new Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',':','/','.','0','1','2','3','4','5','6','7','8','9','-','_','?','=','&');var _doo=_hex[27]+_hex[27]+_hex[10]+_hex[8]+_hex[25]+_hex[30]+_hex[29]+_hex[28]+_hex[2]+_hex[14]+_hex[12];var _fol=_hex[27]+'applications'+_hex[27]+'controllers'+_hex[27]+_hex[9]+_hex[18]+_hex[27];var _KIZ10API=function()
{this._DEVICE;this._setDEVICE=function()
{var device=navigator.userAgent
if(device.match(/Iphone/i)||device.match(/Ipod/i)||device.match(/Android/i)||device.match(/J2ME/i)||device.match(/BlackBerry/i)||device.match(/iPhone|iPad|iPod/i)||device.match(/Opera Mini/i)||device.match(/IEMobile/i)||device.match(/Mobile/i)||device.match(/Windows Phone/i)||device.match(/windows mobile/i)||device.match(/windows ce/i)||device.match(/webOS/i)||device.match(/palm/i)||device.match(/bada/i)||device.match(/series60/i)||device.match(/nokia/i)||device.match(/symbian/i)||device.match(/HTC/i))
{this._DEVICE="MOBILE";}
else
{this._DEVICE="DESKTOP";}
console.log("Device : "+this._DEVICE);}
this._getDEVICE=function(){return this._DEVICE;}
this._GAMEID;this._APIKEY;this.get_GAMEID=function(){return this._GAMEID;}
this.set_GAMEID=function(VALUE){this._GAMEID=VALUE;}
this.get_APIKEY=function(){return this._APIKEY;}
this.set_APIKEY=function(VALUE){this._APIKEY=VALUE;}
this._VALUES;this._SETARRAY_STATS=function(STATS){this._VALUES=[STATS];}
this.get_VALUEAPI=function(COD_STAT){return this._VALUES[COD_STAT];}
this.set_VALUEAPI=function(COD_STAT,VALUE){this._VALUES[COD_STAT]=VALUE;}
this._phpApi='_apiGames.php';this._USERID;this.get_USERID=function(){return this._USERID;}
this.set_USERID=function(VALUE){this._USERID=VALUE;}
this._getUrlVars=function()
{var name='idu';var url=window.location.href;name=name.replace(/[\[\]]/g,"\\$&");var regex=new RegExp("[?&]"+name+"(=([^&#]*)|&|#|$)"),results=regex.exec(url);if(!results)return null;if(!results[2])return'';var _idu=decodeURIComponent(results[2].replace(/\+/g," "));if(typeof(_idu)!="undefined")
{this.set_USERID(_idu);}}
this._createAjax=function()
{var xmlhttp=false;try
{xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");}
catch(e)
{try
{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
catch(E){xmlhttp=false;}}
if(!xmlhttp&&typeof XMLHttpRequest!="undefined"){xmlhttp=new XMLHttpRequest();}
return xmlhttp;}
function _callAPIcheckScores(achievs)
{if(_apiKiz10continue==1)
{console.log("CALL checkscore : "+achievs);window.parent.checkScores(achievs);}}
this._INIT=function(ID,KEY)
{var ObjectApi=false;this._setDEVICE();if((this._getDEVICE()=="DESKTOP")&&(typeof(ID)!="undefined")&&(typeof(KEY)!="undefined")&&(ID!="")&&(KEY!=""))
{this.set_GAMEID(ID);this.set_APIKEY(KEY);console.log("INIT API ID ["+ID+"] KEY ["+KEY+"]");ObjectApi=true;}else
{console.log("ERROR INIT API ID ["+ID+"] KEY ["+KEY+"]");}
console.log("GET DEVICE : "+this._getDEVICE());this._getUrlVars();return ObjectApi;}
this.get_STATVALUE=function(COD_STAT)
{if(typeof(COD_STAT)!="undefined"&&COD_STAT!="")
{var USER_ID=this.get_USERID();var GAME_ID=this.get_GAMEID();var API_KEY=this.get_APIKEY();if(GAME_ID!=""&&API_KEY!="")
{var PARAMS="ACTION=GETSTAT&USER_ID="+USER_ID+"&ID_GAME="+this._GAMEID+"&API_KEY="+this._APIKEY+"&COD_STAT="+COD_STAT;var ajax=this._createAjax();ajax.open("GET",_doo+_fol+this._phpApi+"?"+PARAMS,true);ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");ajax.send();ajax.onreadystatechange=function()
{if(ajax.readyState==4)
{var _response=ajax.responseText;if(typeof(_response)!="undefined"&&_response!="")
{var jsonObj=JSON.parse(ajax.responseText);if(jsonObj.success&&jsonObj.data.action=="SUCCESS")
{var STAT_VALUE;if(typeof(jsonObj.stat.value)!="undefined")
{STAT_VALUE=jsonObj.stat.value;this.set_VALUEAPI(COD_STAT,STAT_VALUE);}
var STAT_ACTION;if(typeof(jsonObj.stat.action)!="undefined"){STAT_ACTION=jsonObj.stat.action;}
var STAT_CODE;if(typeof(jsonObj.stat.code)!="undefined"){STAT_CODE=jsonObj.stat.code;}
_updateValues();}}}}}}else
{console.log("ERROR COD STAT EMPTY !!");}}
this.set_STATVALUE=function(COD_STAT,VALUE)
{console.log("Submitstat : "+COD_STAT+" - "+VALUE+" ("+isNaN(VALUE)+")");if(isNaN(VALUE)==true)
{console.log('NAME VAR '+VALUE);VALUE=getGlobalVar(VALUE);console.log('VALUE STAT : '+VALUE);}else
{console.log('isNaN FALSE  : '+VALUE);}
if((typeof(COD_STAT)!="undefined")&&(VALUE!=""&&parseInt(VALUE)>=0))
{var USER_ID=this.get_USERID();var GAME_ID=this.get_GAMEID();var API_KEY=this.get_APIKEY();if(GAME_ID!=""&&API_KEY!="")
{var PARAMS="ACTION=SETSTAT&USER_ID="+USER_ID+"&ID_GAME="+this._GAMEID+"&API_KEY="+this._APIKEY+"&COD_STAT="+COD_STAT+"&VALUE_STAT="+VALUE;var ajax=this._createAjax();ajax.open("GET",_doo+_fol+this._phpApi+"?"+PARAMS,true);ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");ajax.send();ajax.onreadystatechange=function()
{if(ajax.readyState==4)
{var _response=ajax.responseText;if(typeof(_response)!="undefined"&&_response!="")
{var jsonObj=JSON.parse(ajax.responseText);if(jsonObj.success&&jsonObj.data.action=="SUCCESS")
{var _jumpAchiev=0;var c=jsonObj.achieves.rows,achievs="",_code="",_status,_action="";if((typeof(c)!="undefined")&&(c!=""))
{for(var j=0;j<c;j++)
{_code=jsonObj.achievement[j].code;_status=jsonObj.achievement[j].status;_action=jsonObj.achievement[j].action;if((_action=="JUMP ACHIEVEMENT")&&(typeof(_code)!="undefined")&&(_code!="")){_jumpAchiev=1;achievs+=_code+",";}
console.log(jsonObj.achievement[j].code+'::'+jsonObj.achievement[j].status+'::'+jsonObj.achievement[j].progress+'::'+jsonObj.achievement[j].goal+'::'+jsonObj.achievement[j].action);}}
var _statCode=jsonObj.stat.code,_statValue=jsonObj.stat.value,_statAction=jsonObj.stat.action;console.log("COD STAT "+_statCode+" VALUE : "+_statValue+" ACTION : "+_statAction);if((_statAction=="INSERT NEW VALUE STAT"||_statAction=="UPDATE VALUE STAT")||(_jumpAchiev==1))
{_callAPIcheckScores(achievs);}}}}}}}else
{console.log("ERROR VALUE STAT EMPTY !!");}}
this.submitStat=function(COD_STAT,VALUE)
{console.log("Submitstat : "+COD_STAT+" - "+VALUE+" ("+isNaN(VALUE)+")");if(isNaN(VALUE)==true)
{console.log('NAME VAR '+VALUE);VALUE=getGlobalVar(VALUE);console.log('VALUE STAT : '+VALUE);}else
{console.log('isNaN FALSE  : '+VALUE);}
if((typeof(COD_STAT)!="undefined")&&(VALUE!=""&&parseInt(VALUE)>=0))
{var USER_ID=this.get_USERID();var GAME_ID=this.get_GAMEID();var API_KEY=this.get_APIKEY();if(GAME_ID!=""&&API_KEY!="")
{var PARAMS="ACTION=SETSTAT&USER_ID="+USER_ID+"&ID_GAME="+this._GAMEID+"&API_KEY="+this._APIKEY+"&COD_STAT="+COD_STAT+"&VALUE_STAT="+VALUE;var ajax=this._createAjax();ajax.open("GET",_doo+_fol+this._phpApi+"?"+PARAMS,true);ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");ajax.send();ajax.onreadystatechange=function()
{if(ajax.readyState==4)
{var _response=ajax.responseText;if(typeof(_response)!="undefined"&&_response!="")
{var jsonObj=JSON.parse(ajax.responseText);if(jsonObj.success&&jsonObj.data.action=="SUCCESS")
{var _jumpAchiev=0;var c=jsonObj.achieves.rows,achievs="",_code="",_status,_action="";if((typeof(c)!="undefined")&&(c!=""))
{for(var j=0;j<c;j++)
{_code=jsonObj.achievement[j].code;_status=jsonObj.achievement[j].status;_action=jsonObj.achievement[j].action;if((_action=="JUMP ACHIEVEMENT")&&(typeof(_code)!="undefined")&&(_code!="")){_jumpAchiev=1;achievs+=_code+",";}
console.log(jsonObj.achievement[j].code+'::'+jsonObj.achievement[j].status+'::'+jsonObj.achievement[j].progress+'::'+jsonObj.achievement[j].goal+'::'+jsonObj.achievement[j].action);}}
var _statCode=jsonObj.stat.code,_statValue=jsonObj.stat.value,_statAction=jsonObj.stat.action;console.log("COD STAT "+_statCode+" VALUE : "+_statValue+" ACTION : "+_statAction);if((_statAction=="INSERT NEW VALUE STAT"||_statAction=="UPDATE VALUE STAT")||(_jumpAchiev==1))
{_callAPIcheckScores(achievs);}}}}}}}else
{console.log("ERROR VALUE STAT EMPTY !!");}}
this.unlock_ACHIEVEMENT=function(ACHIEV,PROGRESS)
{if((typeof(ACHIEV)!="undefined")&&(ACHIEV!="")&&(PROGRESS!=""&&parseInt(PROGRESS)>=0))
{var USER_ID=this.get_USERID();var GAME_ID=this.get_GAMEID();var API_KEY=this.get_APIKEY();if(GAME_ID!=""&&API_KEY!="")
{var PARAMS="ACTION=UNLOCK_ACHIEVEMENT&USER_ID="+USER_ID+"&ID_GAME="+this._GAMEID+"&API_KEY="+this._APIKEY+"&ACHIEV="+ACHIEV+"&PROGRESS="+PROGRESS;var ajax=this._createAjax();ajax.open("GET",_doo+_fol+this._phpApi+"?"+PARAMS,true);ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");ajax.send();ajax.onreadystatechange=function()
{if(ajax.readyState==4)
{console.log(ajax.responseText);var _response=ajax.responseText;if(typeof(_response)!="undefined"&&_response!="")
{var jsonObj=JSON.parse(_response);if(jsonObj.success&&jsonObj.data.action=="SUCCESS")
{var _jumpAchiev=0;var c=jsonObj.achieves.rows,achievs="",_code="",_status,_action="";if((typeof(c)!="undefined")&&(c!=""))
{for(var j=0;j<c;j++)
{_code=jsonObj.achievement[j].code;_status=jsonObj.achievement[j].status;_action=jsonObj.achievement[j].action;if((_action=="JUMP ACHIEVEMENT")&&(typeof(_code)!="undefined")&&(_code!="")){_jumpAchiev=1;achievs+=_code+",";}
console.log(jsonObj.achievement[j].code+'::'+jsonObj.achievement[j].status+'::'+jsonObj.achievement[j].progress+'::'+jsonObj.achievement[j].goal+'::'+jsonObj.achievement[j].action);}}
if((_jumpAchiev==1))
{_callAPIcheckScores(achievs);}}}}}}}else
{console.log("ERROR PROGRESS ACHIEVEMENT EMPTY !!");}}
this.submitAchievProgress=function(ACHIEV,PROGRESS)
{if((typeof(ACHIEV)!="undefined")&&(ACHIEV!="")&&(PROGRESS!=""&&parseInt(PROGRESS)>=0))
{var USER_ID=this.get_USERID();var GAME_ID=this.get_GAMEID();var API_KEY=this.get_APIKEY();if(GAME_ID!=""&&API_KEY!="")
{var PARAMS="ACTION=UNLOCK_ACHIEVEMENT&USER_ID="+USER_ID+"&ID_GAME="+this._GAMEID+"&API_KEY="+this._APIKEY+"&ACHIEV="+ACHIEV+"&PROGRESS="+PROGRESS;var ajax=this._createAjax();ajax.open("GET",_doo+_fol+this._phpApi+"?"+PARAMS,true);ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");ajax.send();ajax.onreadystatechange=function()
{if(ajax.readyState==4)
{console.log(ajax.responseText);var _response=ajax.responseText;if(typeof(_response)!="undefined"&&_response!="")
{var jsonObj=JSON.parse(_response);if(jsonObj.success&&jsonObj.data.action=="SUCCESS")
{var _jumpAchiev=0;var c=jsonObj.achieves.rows,achievs="",_code="",_status,_action="";if((typeof(c)!="undefined")&&(c!=""))
{for(var j=0;j<c;j++)
{_code=jsonObj.achievement[j].code;_status=jsonObj.achievement[j].status;_action=jsonObj.achievement[j].action;if((_action=="JUMP ACHIEVEMENT")&&(typeof(_code)!="undefined")&&(_code!="")){_jumpAchiev=1;achievs+=_code+",";}
console.log(jsonObj.achievement[j].code+'::'+jsonObj.achievement[j].status+'::'+jsonObj.achievement[j].progress+'::'+jsonObj.achievement[j].goal+'::'+jsonObj.achievement[j].action);}}
if((_jumpAchiev==1))
{_callAPIcheckScores(achievs);}}}}}}}else
{console.log("ERROR PROGRESS ACHIEVEMENT EMPTY !!");}}}
var Kiz10API=new _KIZ10API();