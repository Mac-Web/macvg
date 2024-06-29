//
// SpriptLoader.js
// The JS for loading JS
// by chrysls on Github
//
// Last updated - 04/08/2015

var Loader = {}; //namespace
Loader.starttime = Date.now();
Loader.timer = {};  // contains timers for scripts
Loader.scripts = [];  // contains called script references
Loader.version = '0.0.0';
Loader.loaded = 0;
Loader.finish = function(){};
Loader.load = function(url, callback) {
    // handle object or path
    var classname = null;
    var properties = null;
    try {
        // make sure we only load once
        if (Loader.scripts.indexOf(url) == -1) {
            // note that we loaded already
            Loader.scripts.push(url);
            var script = document.createElement("script");
            script.src = url+'?v='+Loader.version;
            script.type = "text/javascript";
            script.charset = 'utf-8';
            document.querySelector('head').appendChild(script);  // add script tag to head element

            // was a callback requested
            if (callback) {
                // test for onreadystatechange to trigger callback
                script.onreadystatechange = function () {
                    if (script.readyState == 'loaded' || script.readyState == 'complete') {
                        callback();
                    }
                }
                // test for onload to trigger callback
                script.onload = function () {
                    Loader.loaded += 1;
                    callback();
                    if (Loader.loaded == Loader.scripts.length) {
                        console.info('[Loader] All ('+Loader.loaded+') scripts are loaded.', (Date.now()-Loader.starttime+"ms"));
                        Loader.finish();
                    }
                    return;
                }
                // safari doesn't support either onload or readystate, create a timer
                // only way to do this in safari
                /*if ((Prototype.Browser.WebKit && navigator.userAgent.match(/Version\/[12]/)) || Prototype.Browser.Opera) { // sniff
                    Loader.timer[url] = setInterval(function() {
                        if (/loaded|complete/.test(document.readyState)) {
                            clearInterval(Loader.timer[url]);
                            callback(); // call the callback handler
                        }
                    }, 10);
                }*/
            } else {
                script.onload = function () {
                    Loader.loaded += 1;
                    if (Loader.loaded == Loader.scripts.length) {
                        console.info('[Loader] All ('+Loader.loaded+') scripts are loaded.', (Date.now()-Loader.starttime+"ms"));
                        Loader.finish();
                    }
                }
            }
        } else {
            if (callback) { callback(); }
        }
    } catch (e) {
        alert('Loader:   ' + e);
    }
}