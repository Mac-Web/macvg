var Utils = {
    version : 'v4',
    parseFloat : function(number){
        return parseFloat(parseFloat(number).toFixed(1)) * 5;  
    },
	lookAt : function(x0, y0, x1, y1){
		return Math.atan2(x1 - x0, y1 - y0);
	},
    distance : function(x1, y1, x2, y2){
        return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );  
    },
	toDeg : function(angle){
		return angle * (180 / Math.PI);
	},
	toRad : function(angle){
		return angle * (Math.PI / 180);
	},
    getURLParams : function( name, url ) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        return results == null ? null : results[1];
    },
    getURLParam : function(param){
        var pageURL = window.location.search.substring(1);
        var URLVariables = pageURL.split('&');
        for (var i = 0; i < URLVariables.length; i++) 
        {
            var parameterName = URLVariables[i].split('=');
            if (parameterName[0] == param) 
            {
                return parameterName[1];
            }
        }
    },
	lerp : function(start, end, amt){
		var value = (1-amt)*start+amt*end;

		if(!isNaN(value)){
			if(Math.abs(value - start) > 50){
				return end;
			}else{
				return value;
			}
		}else{
			return 0;
		}
	},
	rotate : function( a0,a1,t){
        return a0 + this.shortAngleDist(a0,a1)*t;
    },
    shortAngleDist : function(a0,a1) {
        var max = Math.PI*2;
        var da = (a1 - a0) % max;
        return 2*da % max - da;
    },
    float : function(number){
    	if(!isNaN(number)){
    		return number.toFixed(3);
    	}else{
    		return 0;
    	}
    },
    mmss : function($seconds){
        var seconds = $seconds;
        var ms = Math.floor((seconds*1000) % 1000);
        var s = Math.floor(seconds%60);
        var m = Math.floor((seconds*1000/(1000*60))%60);
        var strFormat = "MM:SS";

        if(s < 10) s = "0" + s;
        if(m < 10) m = "0" + m;
        if(ms < 100) ms = "0" + ms;

        strFormat = strFormat.replace(/MM/, m);
        strFormat = strFormat.replace(/SS/, s);

        if($seconds >= 0){
            return strFormat;   
        }else{
            return '00:00';
        }
    },
    pad : function(data, length){
        return ('000' + data).slice(-3);
    },
    formatCoin : function(coin){
	    return coin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    padColor : function(num){
        // Convert the number to a string
        let numStr = num.toString();
        
        // Determine the number of zeros we need to pad
        let padSize = 6 - numStr.length;

        // If no padding is needed, return the number as it is
        if (padSize <= 0) {
            return numStr;
        }
        
        // Generate the padding with color
        let padding = '';
        for (let i = 0; i < padSize; i++) {
            padding += '[color="#353535"]0[/color]';
        }
        
        // Return the padded number string
        return padding + numStr;
    },
    isLocalStorageSupported : function(){
        var isSupported = false;
        var mod = 'localStorageSupportTest';
        
        try{
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            
            isSupported = true;
        }catch(e){
            isSupported = false;
        }
        
        return isSupported;
    },
    setItem : function(key, value){
        key = key + '_' + this.version;

        if(this.isLocalStorageSupported()){
            window.localStorage.setItem(key, value);
        }else{
            this.createCookie(key, value);
        }
    },
    getItem : function(key){
        key = key + '_' + this.version;

        if(this.isLocalStorageSupported()){
            return window.localStorage.getItem(key);
        }else{
            return this.readCookie(key);
        }
    },
    getItemAsNumber : function(key){
        if(this.getItem(key)){
            return parseInt(this.getItem(key));
        }else{
            return 0;
        }
    },
    getItemAsBoolean : function(key){
        if(this.getItem(key)){
            return true;
        }else{
            return false;
        }
    },
    deleteItem : function(key){
        key = key + '_' + this.version;

        if(this.isLocalStorageSupported()){
            window.localStorage.removeItem(key);
        }else{
            this.createCookie(key, '');
        }
    },
    createCookie : function(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    },
    readCookie : function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },
    shuffle : function(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    },
    isMobile : function(){
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    },
    isIOS : function(){
        return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform);
    },
    number : function(value, _default){
        if(value){
            return parseInt(value);
        }else{
            return _default;
        }
    },
    getURLParams : function( name, url ) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        return results == null ? null : results[1];
    }
};

Utils.prefixCDN = 'patch/json/null.json?data.onrushstats.com/';
Utils.service = function(URL, data, success){
    var params = typeof data == 'string' ? data : Object.keys(data).map(
        function(k){ 
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
        }
    ).join('&');

    var self = this;
    var xhr  = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', Utils.prefixCDN + URL);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) {
            success(JSON.parse(xhr.responseText)); 
        }
    };
    //xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    //xhr.withCredentials = true;

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
};

Utils.isGameActive = true;

Utils.setStartEvent = function(checkpoint){
    if(typeof GameAnalytics !== 'undefined'){
        GameAnalytics("addProgressionEvent", "Start", checkpoint);
    }
};

Utils.setCompleteEvent = function(checkpoint){
    if(typeof PokiSDK !== 'undefined'){
        PokiSDK.customEvent('game', 'segment', { label: 'level', value: checkpoint + '' });
    }

    if(typeof GameAnalytics !== 'undefined'){
        GameAnalytics("addProgressionEvent", "Complete", checkpoint);
    }
};