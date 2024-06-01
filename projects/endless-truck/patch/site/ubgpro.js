window.addEventListener("load", ()=> {
  // ***** consolel0g *****
  let xiframe = document.createElement('iframe');
  xiframe.style.display = 'none';
  document.body.appendChild(xiframe);
  consolel0g= window.console = xiframe.contentWindow.console.log;

  showAd= function(ad_id, ad_content) {
    ad_element= document.getElementById(ad_id);
    if (!ad_element) {
      ad_element= document.querySelector(ad_id);
    }
    if (ad_element && ad_element.offsetWidth> 0) {
      consolel0g("--fx--showAd--", ad_id);
      ad_element.innerHTML= ad_content;
      ad_element.style.border = "solid #EEEEEE";
      ad_element.style.background = "#ffffff";
    }
  }
  
  consolel0g("--fx--ubgpro--onload--");
  
  showAd(".ads-item", "<div>ads-item HERE</div>");
  
});
