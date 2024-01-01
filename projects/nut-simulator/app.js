document.addEventListener("DOMContentLoaded", function () {
  const fullScreen = document.getElementById("fullscreen");
  const iframe = document.getElementById("iframe");
  const download = document.getElementById("download");
  const back = document.getElementById("back");
  const share = document.getElementById("share");
  const gameFrame = document.getElementById("gameframe");
  fullScreen.addEventListener("click", function () {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      fullScreen.src = "/macvg/expand.svg";
    } else {
      gameFrame.requestFullscreen();
      iframe.style.height = "calc(100vh - 44px)";
      fullScreen.src = "/macvg/compress.svg";
    }
  });
  const up2 = document.createElement("div");
  const macvgClose = document.createElement("button");
  up2.style.width = "50%";
  up2.style.position = "fixed";
  up2.style.top = "25vh";
  up2.style.left = "25vw";
  up2.style.height = "50vh";
  up2.style.backgroundColor = "black";
  up2.style.color = "white";
  up2.style.zIndex = "100000000000";
  up2.style.borderRadius = "30px";
  up2.style.padding = "3%";
  up2.style.fontSize = "25px";
  up2.style.display = "none";
  up2.style.lineHeight = "40px";
  up2.style.fontFamily = "Arial, Helvetica, sans-serif";
  up2.style.boxShadow = "0px 0px 30px black";
  macvgClose.style.display = "block";
  macvgClose.style.width = "50%";
  macvgClose.style.fontFamily = "Arial, Helvetica, sans-serif";
  macvgClose.style.marginInline = "25%";
  macvgClose.style.padding = "10px";
  macvgClose.style.backgroundColor = "black";
  macvgClose.style.color = "white";
  macvgClose.style.borderRadius = "30px";
  macvgClose.style.marginBlock = "20px";
  macvgClose.style.fontWeight = "bold";
  macvgClose.style.cursor = "pointer";
  macvgClose.style.fontSize = "25px";
  macvgClose.style.border = "3px solid white";
  macvgClose.style.boxSizing = "border-box";
  up2.style.boxSizing = "border-box";
  up2.innerHTML =
    "Link copied! You can share it in an email, social media, text, website, or any other place to share the game!";
  macvgClose.innerHTML = "Done";
  macvgClose.addEventListener("click", function () {
    up2.style.display = "none";
  });
  let body23 = document.getElementsByTagName("body");
  body23[0].appendChild(up2);
  up2.appendChild(macvgClose);
  back.addEventListener("click", function () {
    history.back();
  });
  download.addEventListener("click", function () {
    window.open("https://forms.gle/dqpitEzRd6rQbTVd7", "_blank");
  });
  share.addEventListener("click", function () {
    let thing123 = window.location.href;
    navigator.clipboard.writeText(thing123);
    console.log(up2);
    console.log(body23);
    up2.style.display = "block";
  });
  //FAVORITE IS STILL NOT WORKING
});
