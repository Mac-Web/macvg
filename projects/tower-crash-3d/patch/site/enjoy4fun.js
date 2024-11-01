consolel0g= console.log;
adsTag= {
  "renderInterstitial": function(){
    consolel0g("--fx--adsTag--renderInterstitial--", arguments);
  },
  "renderAnchor": function() {
    consolel0g("--fx--adsTag--renderAnchor--", arguments);
  },
  "init": function() {
    consolel0g("--fx--adsTag--init--", arguments);
  },
  "renderAds": function() {
    consolel0g("--fx--adsTag--renderAds--", arguments);
  },
}

window.addEventListener("load", ()=> {
  // ***** consolel0g *****
  let xiframe = document.createElement('iframe');
  xiframe.style.display = 'none';
  document.body.appendChild(xiframe);
  consolel0g= xiframe.contentWindow.console.log;
});
