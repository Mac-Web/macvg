window.addEventListener("load", ()=> {
  // ***** consolel0g *****
  let xiframe = document.createElement('iframe');
  xiframe.style.display = 'none';
  document.body.appendChild(xiframe);
  consolel0g= xiframe.contentWindow.console.log;

  showAd= function(ad_id, ad_content) {
    ad_element= document.getElementById(ad_id);
    if (ad_element && ad_element.offsetWidth> 0) {
      consolel0g("--fx--showAd--", ad_id);
      ad_element.innerHTML= ad_content;
      ad_element.style.border = "solid #EEEEEE";
      ad_element.style.background = "#ffffff";
    }
  }
  
  consolel0g("--fx--4yee--onload--");
  
  showAd("ad_game_left", "<div>ad_game_left HERE</div>");
  showAd("ad_game_2", "<div>ad_game_2 HERE</div>");
  showAd("ad_game_right", "<div>ad_game_right HERE</div>");
  showAd("ad_game_right1", "<div>ad_game_right1 HERE</div>");
  showAd("ad_category_right", "<div>ad_category_right HERE</div>");

  setTimeout(()=>{
    buttonPlay= document.querySelector(".play-pc-game");
    buttonPlay && buttonPlay.click();
  }, 1000);
  
});
