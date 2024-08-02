<!doctype html><html lang="en"><head><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
				new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
			j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
			'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayerGPX','GTM-K7CPNRZ');</script><script>function gpxGetCookieKeys () {
                if (!document.cookie) return [];
                var _keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
                for (var _index = 0; _index < _keys.length; _index++) {
                    _keys[_index] = decodeURIComponent(_keys[_index]);
                }
                return _keys;
            }
            function gpxGetCookie (cname) {
                var name = cname + "=";
                var decodedCookie = decodeURIComponent(document.cookie);
                var ca = decodedCookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) === ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) === 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return null;
            }
            function gpxSetCookie (name, value, expirationDays = 10000, path="/", domain = location.host) {
                var expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + (expirationDays*24*60*60*1000));
                document.cookie = name+"="+value+";path="+path+"; expires="+expirationDate.toUTCString()+";SameSite=None;Secure;domain="+domain;
            }
            function gpxDeleteCookie (name, path="/", domain = location.host) { document.cookie = name+"=;path="+path+";expires=Thu, 01 Jan 1970 00:00:01 GMT;SameSite=None;Secure;domain="+domain};

            function getParameterByName(name, url) {
                if (!url) url = window.location.href;
                name = name.replace(/[\[\]]/g, '\\$&');
                var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, ' '));
            }
            let getLang = function(){
				let lang;
				try {
					lang = getParameterByName('lang') && getParameterByName('lang').split('-')[0];
					if (!lang) {
						lang = navigator.languages && navigator.languages.length
							? navigator.languages[0].substring(0, 2)
							: navigator.language.substring(0, 2);
					}
                } catch {
					lang = 'en'
                }
				return lang || 'en'
            }

            var ref = (document.referrer && document.referrer.match(/:\/\/(.[^/]+)/)[1]) || 'direct';
            // var namespace = location.pathname && location.pathname.split('/').length > 1 ? location.pathname.split('/')[1] : null;
            // if(namespace) {
            //     var link = !!document.querySelector("link[rel='canonical']") ? document.querySelector("link[rel='canonical']") : document.createElement('link');
            //     link.setAttribute('rel', 'canonical');
            //     link.setAttribute('href', 'https://www.gamepix.com/play/' + namespace + '/');
            //     document.head.appendChild(link);
            // }

            //cookie policy enabler, disable cookie policy for some sid
            let policyExcludedSid = ['110665', '110783']
            if(policyExcludedSid.indexOf(getParameterByName('sid')) == -1){
				let lang_id = getLang()
					, policy_id;

				switch (lang_id) {
					case 'it':
						policy_id = 78224144;
						break;
					case 'fr':
						policy_id = 59659549;
						break;
					case 'de':
						policy_id = 40043440;
						break;
					case 'es':
						policy_id = 24193842;
						break;
					case 'pt':
						policy_id = 39895310
						lang_id = 'pt-BR';
						break;
					default:
						lang_id = 'en';
						policy_id = 64038034
						break
				}

				var _iub = _iub || [];
				_iub.csConfiguration = {
					"consentOnContinuedBrowsing": false,
					"ccpaAcknowledgeOnDisplay": true,
					"googleAdditionalConsentMode":true,
					"newConsentAtVendorListUpdate":0,
					"askConsentAtCookiePolicyUpdate":true,
					"whitelabel": false,
					"lang": lang_id,
					"siteId": 1944774,
					"enableCcpa": true,
					"enableTcf":true,
					"countryDetection": true,
					"enableRemoteConsent": true,
					"enableCMP": true,
					"tcfVersion": 2,
					// "perPurposeContent":true,
					// "preferenceCookie": {
					//     "expireAfter": 1
					// },
					"cookiePolicyId": policy_id,
					// "isTCFConsentGlobal": false,
					"banner": {
						"position": "float-bottom-center",
						// "acceptButtonDisplay": true,
						// "customizeButtonDisplay": true,
						// "closeButtonDisplay": false
						"acceptButtonDisplay": true,
						"customizeButtonDisplay": true,
						"closeButtonDisplay": false,
						"applyStyles": false
					}
				};
				window['gtag_enable_tcf_support'] = true;

				// let patchedIubenda = gpxGetCookie('ptcIub');
				// if(!patchedIubenda){
				// 	let cookiesKeys = gpxGetCookieKeys();
				// 	gpxDeleteCookie('ptc_iub', '/', 'gamepix.com');
				// 	for(let c of cookiesKeys){
				// 		if(c.indexOf("euconsent-v2") > -1 || c.indexOf("_iub") > -1){
				// 			gpxDeleteCookie(c, '/', 'gamepix.com');
				// 			gpxDeleteCookie(c, '/', 'play.gamepix.com');
				// 		}
				// 	}
				// 	//set Iubenda patched cookie for 1 day
				// 	gpxSetCookie("ptcIub","true", 7, '/', "gamepix.com");
				// }
                var iubendaTcfStubStubScript = document.querySelector("script[src='//cdn.iubenda.com/cs/tcf/stub-v2.js']") ? document.querySelector("script[src='//cdn.iubenda.com/cs/tcf/stub-v2.js']") : document.createElement('script');
                iubendaTcfStubStubScript.setAttribute('src', '//cdn.iubenda.com/cs/tcf/stub-v2.js');
                iubendaTcfStubStubScript.setAttribute('type', 'text/javascript');
                document.head.appendChild(iubendaTcfStubStubScript);

                var iubendaSafeTcfScript = document.querySelector("script[src='//cdn.iubenda.com/cs/tcf/safe-tcf-v2.js']") ? document.querySelector("script[src='//cdn.iubenda.com/cs/tcf/safe-tcf-v2.js']") : document.createElement('script');
                iubendaSafeTcfScript.setAttribute('src', '//cdn.iubenda.com/cs/tcf/safe-tcf-v2.js');
                iubendaSafeTcfScript.setAttribute('type', 'text/javascript');
                document.head.appendChild(iubendaSafeTcfScript);

                var iubendaCcpaStubScript = document.querySelector("script[src='//cdn.iubenda.com/cs/ccpa/stub.js']") ? document.querySelector("script[src='//cdn.iubenda.com/cs/ccpa/stub.js']") : document.createElement('script');
                iubendaCcpaStubScript.setAttribute('src', '//cdn.iubenda.com/cs/ccpa/stub.js');
                iubendaCcpaStubScript.setAttribute('type', 'text/javascript');
                document.head.appendChild(iubendaCcpaStubScript);

                var iubendaCsSript = document.querySelector("script[src='//cdn.iubenda.com/cs/iubenda_cs.js']") ? document.querySelector("script[src='//cdn.iubenda.com/cs/iubenda_cs.js']") : document.createElement('script');
                iubendaCsSript.setAttribute('src', '//cdn.iubenda.com/cs/iubenda_cs.js');
                iubendaCsSript.setAttribute('charset', 'UTF-8');
                iubendaCsSript.setAttribute('type', 'text/javascript');
                iubendaCsSript.setAttribute('async', 'async');
                document.head.appendChild(iubendaCsSript);
            }


            var mainColor = "#0e385b";
            if(getParameterByName('mainColor')){
                mainColor = "#" + getParameterByName('mainColor');
                if(mainColor == "#fff" || mainColor == "#ffffff"){
                    mainColor = "#000000"
                }
            };

                //append loader color and html page color
            var colorStyle = document.createElement("style");
            colorStyle.innerHTML = ".gpx-loader { color:"+mainColor+" !important; }";
            document.getElementsByTagName("head")[0].appendChild(colorStyle);</script><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="robots" content="noindex, follow"><meta name="viewport" content="height=device-height,initial-scale=1,width=device-width,maximum-scale=1,user-scalable=no,minimal-ui,viewport-fit=cover"><meta name="mobile-web-app-capable" content="yes"><script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script><script src="patch/google/ima3.js?imasdk.googleapis.com/js/sdkloader/ima3.js"></script><script>// Create Google tag
            window.googletag = {};
            googletag.cmd = googletag.cmd || [];</script><link rel="icon" href="/player/favicon.ico"><link rel="stylesheet" href="/player/assets/css/style.css"><link rel="stylesheet" href="/player/assets/UI/style.css"><link href="https://fonts.googleapis.com/css?family=Nunito:400,700&amp;display=swap" rel="stylesheet"><script src="/player/assets/js/safari-nomodule-fix.js" type="module"></script><script defer="defer" type="module" src="/player/assets/js/app.js"></script><link href="/player/assets/css/app.css" rel="stylesheet"><script defer="defer" src="/player/assets/js/app-legacy.js" nomodule></script></head><body><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K7CPNRZ" height="0" width="0" style="display:none;visibility:hidden"></iframe><strong>We're sorry but this player doesn't work without JavaScript enabled. Please enable it to continue.</strong></noscript><div id="app"><div class="gpx-loader"><svg viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg></div></div><a href="#" id="custom-iub-pref" class="iubenda-advertising-preferences-link" style="color:white;position: absolute;bottom: 0;right: 10px;font-size:12px;cursor: default;text-decoration:none;z-index:1"><img width="25px" height="25px" src="/player/assets/img/cookies.png"/></a></body></html>