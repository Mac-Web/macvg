document.addEventListener("DOMContentLoaded", function () {
  let nameabc = document.getElementById("macvgmacvg").getAttribute("name");
  let eRecent = localStorage.getItem("macvgRecents");
  if (eRecent === null) {
    eRecent = "bruh";
  }
  let recentArray = eRecent.split(",");
  if (!recentArray.includes(nameabc)) {
    recentArray.push(nameabc);
    eRecent = recentArray.join(",");
    localStorage.setItem("macvgRecents", eRecent);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let thing87638 = setInterval(() => {
    let theme = localStorage.getItem("theme");
    if (theme === "light") {
      const root = document.documentElement;
      root.style.setProperty("--text-color", "black");
      root.style.setProperty("--link", "rgb(225, 139, 9)");
      root.style.setProperty("--shadow-color", "rgb(84, 84, 84)");
      root.style.setProperty("--black-color", "white");
      root.style.setProperty("--bg-color", "rgb(225, 225, 225)");
      root.style.setProperty("--bg-color-2", "rgb(30, 30, 30)");
      root.style.setProperty("--group-bg-color", "rgb(140, 140, 140, 0.7)");
    } else if (theme === "deep") {
      const root = document.documentElement;
      root.style.setProperty("--text-color", "white");
      root.style.setProperty("--link", "rgb(225, 139, 9)");
      root.style.setProperty("--shadow-color", "0px 0px 5px black");
      root.style.setProperty("--black-color", "black");
      root.style.setProperty("--bg-color", "black");
      root.style.setProperty("--bg-color-2", "black");
      root.style.setProperty("--group-bg-color", "black");
      root.style.setProperty("--bar-color", "black");
    } else if (theme === "cyber") {
      const root = document.documentElement;
      root.style.setProperty("--text-color", "white");
      root.style.setProperty("--shadow-color", "0px 5px 5px #42053f");
      root.style.setProperty("--black-color", "rgb(48,4,98)");
      root.style.setProperty("--bg-color", "#0b023a");
      root.style.setProperty("--link", "rgb(225, 139, 9)");
      root.style.setProperty("--bg-color-2", "#ff00a0");
      root.style.setProperty("--group-bg-color", "rgba(48, 4, 98, 0.7)");
      root.style.setProperty("--bar-color", "#12827e");
      root.style.setProperty("--border", "rgb(50,50,50)");
    } else if (theme === "custom") {
      let first = localStorage.getItem("first");
      let second = localStorage.getItem("second");
      const root = document.documentElement.style;
      root.setProperty("--bg-color", first);
      root.setProperty("--black-color", "rgba(0,0,0,0.4)");
      root.setProperty("--link", second);
    } else {
      const root = document.documentElement;
      root.style.setProperty("--text-color", "white");
      root.style.setProperty("--shadow-color", "transparent");
      root.style.setProperty("--black-color", "black");
      root.style.setProperty("--link", "rgb(225, 139, 9)");
      root.style.setProperty("--bg-color", "rgb(50, 50, 50)");
      root.style.setProperty("--bg-color-2", "white");
      root.style.setProperty("--group-bg-color", "rgba(40, 40, 40, 0.7)");
    }
  }, 100);
  let links = document.querySelector(".links");
  let recent = document.createElement("a");
  let linky = Array.from(links.children);
  recent.innerHTML = "Recent";
  recent.classList.add("nav-link");
  recent.setAttribute("href", "/macvg/recent.html");
  links.insertBefore(recent, linky[3]);
  let linkss = Array.from(document.querySelectorAll(".nav-link"));
  linkss.forEach(function (link) {
    if (link.innerHTML === "Chat") {
      link.style.display = "none";
    }
    if (link.innerHTML === "MacBoard") {
      link.innerHTML = "Originals";
      link.setAttribute("href", "/macvg/originals");
    }
  });
  let crr = document.querySelector(".copyright");
  crr.innerHTML = "© 2024 MacWeb";
  const fullScreen = document.getElementById("fullscreen");
  const iframe = document.getElementById("iframe");
  iframe.contentWindow.addEventListener("keydown", function (e) {
    e.preventDefault();
  });
  const toolBar = document.querySelector(".tool-bar");
  const report = document.createElement("img");
  report.src = "/macvg/flag.svg";
  report.style.width = "18px";
  toolBar.insertBefore(report, fullScreen);
  const back = document.getElementById("back");
  back.style.display = "none";
  const download = document.getElementById("downloadd");
  let nameabc = document.getElementById("macvgmacvg").getAttribute("name");
  if (download) {
    download.addEventListener("click", function () {
      window.location.href = `/macvg/projects/zips/${nameabc}.zip`;
    });
  }
  const share = document.getElementById("share");
  const gameFrame = document.getElementById("gameframe");
  const star = document.getElementById("star");
  let existingDataa = localStorage.getItem("favorites");
  let favoritesArray = existingDataa.split(",");
  const index = favoritesArray.indexOf(nameabc);
  if (index !== -1) {
    star.src = "/macvg/star-solid.svg";
  } else {
    star.src = "/macvg/star-regular.svg";
  }
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
  const downloadd = document.getElementById("download");
  downloadd.style.display = "none";
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
  share.addEventListener("click", function () {
    let thing123 = window.location.href;
    navigator.clipboard.writeText(thing123);
    console.log(up2);
    console.log(body23);
    up2.style.display = "block";
  });
  report.addEventListener("click", function () {
    window.open("https://forms.gle/vKN71eKeMNGiswUY7", "_blank");
  });
  star.addEventListener("click", function () {
    let name = document.getElementById("macvgmacvg").getAttribute("name");
    if (star.src.includes("star-solid")) {
      star.src = "/macvg/star-regular.svg";
      let existingData = localStorage.getItem("favorites");
      let favoritesArray = existingData.split(",");
      const index = favoritesArray.indexOf(name);
      if (index !== -1) {
        favoritesArray.splice(index, 1);
        localStorage.setItem("favorites", favoritesArray);
      }
    } else {
      star.src = "/macvg/star-solid.svg";
      let existingData = localStorage.getItem("favorites");
      if (existingData === null) {
        existingData = "bruh";
      }
      let favoritesArray = existingData.split(",");
      if (!favoritesArray.includes(name)) {
        favoritesArray.push(name);
        existingData = favoritesArray.join(",");
        localStorage.setItem("favorites", existingData);
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const games = document.querySelectorAll(".game");

  games.forEach(function (game) {
    game.addEventListener("mouseover", function () {
      let innerThing = game.innerHTML;
      game.setAttribute("name", innerThing);
    });
  });
});
setInterval(() => {
  const gameIframe = document.getElementById("iframe");
  gameIframe.contentWindow.focus();
  gameIframe.contentWindow.addEventListener("keydown", (event) => {
    let panicKeys = localStorage.getItem("panic");
    let href = localStorage.getItem("href");
    if (panicKeys) {
      if (href) {
        let keys = panicKeys.split(",");
        if (keys.length === 1 && event.key === keys[0]) {
          window.location.href = href;
        }
      } else {
        let href = "https://www.google.com";
        let keys = panicKeys.split(",");
        if (keys.length === 1 && event.key === keys[0]) {
          window.location.href = href;
        }
      }
    } else {
      localStorage.setItem("panic", "`");
      let keys = panicKeys.split(",");
      if (keys.length === 1 && event.key === keys[0]) {
        window.location.href = href;
      }
    }
  });
}, 100);

const google = ["Google", "/macvg/google.png"];
const canva = ["Home - Canva", "/macvg/canva.png"];
const clever = ["Clever | Portal", "/macvg/clever.png"];
const schoology = ["Home | Schoology", "/macvg/schoology.png"];
const newTab = ["New Tab", "/macvg/new-tab.png"];

function google1() {
  localStorage.setItem("title", google);
}

function canva1() {
  localStorage.setItem("title", canva);
}

function clever1() {
  localStorage.setItem("title", clever);
}

function schoology1() {
  localStorage.setItem("title", schoology);
}

function newTab1() {
  localStorage.setItem("title", newTab);
}

function unCloak() {
  const pageTon = document.querySelector(".cloak");
  const favicon = document.querySelector(".favicon");
  favicon.outerHTML = `<link class="favicon" rel="icon" type="image/x-icon" href="/macvg/logo.png" />`;
  pageTon.innerHTML = "Settings | MacVG";
  localStorage.setItem("title", "");
}

function panic() {
  const button = document.getElementById("name2").value;
  localStorage.setItem("panic", button);
}

function url() {
  const inputurl = document.getElementById("name3").value;
  localStorage.setItem("href", inputurl);
}

function cloaking() {
  const name = document.getElementById("name").value;
  const favicon = document.querySelector(".favicon");
  localStorage.title = name + "," + favicon.href;
}

function faviconing() {
  const pageTon = document.querySelector(".cloak");
  const favicon = document.querySelector(".favicon");
  const faviSRC = document.getElementById("name4").value;
  let thingy = [pageTon.innerHTML, faviSRC];
  favicon.outerHTML = `<link class="favicon" rel="icon" type="image/x-icon" href="${faviSRC}" />`;
  localStorage.setItem("title", thingy);
}

function changeName() {
  console.log(localStorage.title);
  if (localStorage.title !== "") {
    const pageTon = document.querySelector(".cloak");
    const favicon = document.querySelector(".favicon");
    if (localStorage.title != null) {
      let all = localStorage.getItem("title");
      let alln = all.split(",");
      let title = alln[0];
      let image = alln[1];
      pageTon.innerHTML = title;
      favicon.outerHTML = `<link class="favicon" rel="icon" type="image/x-icon" href="${image}" />`;
    }
  }
}
setInterval(changeName, 100);
