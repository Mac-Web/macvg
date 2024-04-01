document.addEventListener("DOMContentLoaded", function () {
  const thing = document.getElementById("macvg-pop");
  thing.style.display = "none";
});
/*
document.addEventListener("keydown", (event) => {
  let panicKeys = localStorage.getItem("panic");
  let href = localStorage.getItem("href");
  if (panicKeys) {
    if (href) {
      let keys = panicKeys.split(",");
      if (keys.length >= 2 && event.key === keys[0]) {
        let key1Pressed = true;
        document.addEventListener("keydown", (event) => {
          if (event.key === keys[1] && key1Pressed) {
            window.location.href = href;
          }
        });
        document.addEventListener("keyup", (event) => {
          if (event.key === keys[0]) {
            key1Pressed = false;
          }
        });
      } else if (keys.length >= 2 && event.key === keys[1]) {
        let key1Pressed = true;
        document.addEventListener("keydown", (event) => {
          if (event.key === keys[0] && key1Pressed) {
            window.location.href = href;
          }
        });
        document.addEventListener("keyup", (event) => {
          if (event.key === keys[0]) {
            key1Pressed = false;
          }
        });
      } else if (keys.length === 1 && event.key === keys[0]) {
        window.location.href = href;
      }
    } else {
      let href = "https://www.google.com";
      let keys = panicKeys.split(",");
      if (keys.length >= 2 && event.key === keys[0]) {
        let key1Pressed = true;
        document.addEventListener("keydown", (event) => {
          if (event.key === keys[1] && key1Pressed) {
            window.location.href = href;
          }
        });
        document.addEventListener("keyup", (event) => {
          if (event.key === keys[0]) {
            key1Pressed = false;
          }
        });
      } else if (keys.length >= 2 && event.key === keys[1]) {
        let key1Pressed = true;
        document.addEventListener("keydown", (event) => {
          if (event.key === keys[0] && key1Pressed) {
            window.location.href = href;
          }
        });
        document.addEventListener("keyup", (event) => {
          if (event.key === keys[0]) {
            key1Pressed = false;
          }
        });
      } else if (keys.length === 1 && event.key === keys[0]) {
        window.location.href = href;
      }
    }
  } else {
    localStorage.setItem("panic", "`");
    let keys = panicKeys.split(",");
    if (keys.length >= 2 && event.key === keys[0]) {
      let key1Pressed = true;
      document.addEventListener("keydown", (event) => {
        if (event.key === keys[1] && key1Pressed) {
          window.location.href = href;
        }
      });
      document.addEventListener("keyup", (event) => {
        if (event.key === keys[0]) {
          key1Pressed = false;
        }
      });
    } else if (keys.length >= 2 && event.key === keys[1]) {
      let key1Pressed = true;
      document.addEventListener("keydown", (event) => {
        if (event.key === keys[0] && key1Pressed) {
          window.location.href = href;
        }
      });
      document.addEventListener("keyup", (event) => {
        if (event.key === keys[0]) {
          key1Pressed = false;
        }
      });
    } else if (keys.length === 1 && event.key === keys[0]) {
      window.location.href = href;
    }
  }
});

const google = ["Google", "/macvg/google.png"];
const canva = ["Home - Canva", "/macvg/canva.png"];
const clever = ["Clever | Portal", "/macvg/clever.png"];
const schoology = ["Home | Schoology", "/macvg/schoology.png"];
const newTab = ["New Tab", "/macvg/new-tab.png"];

function google1() {
  localStorage.setItem("title", JSON.stringify(google));
}

function canva1() {
  localStorage.setItem("title", JSON.stringify(canva));
}

function clever1() {
  localStorage.setItem("title", JSON.stringify(clever));
}

function schoology1() {
  localStorage.setItem("title", JSON.stringify(schoology));
}

function newTab1() {
  localStorage.setItem("title", JSON.stringify(newTab));
}

function unCloak() {
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
  localStorage.title = name;
}

function changeName() {
  if (localStorage.title !== "") {
    const pageTon = document.querySelector(".cloak");
    const favicon = document.querySelector(".favicon");
    if (localStorage.title != null) {
      let all = localStorage.getItem("title");
      if (
        all.includes("Clever") ||
        all.includes("Google") ||
        all.includes("Canva") ||
        all.includes("Schoology") ||
        all.includes("New Tab")
      ) {
        let alln = JSON.parse(all);
        let title = alln[0];
        let image = alln[1];
        pageTon.innerHTML = title;
        favicon.outerHTML = `<link class="favicon" rel="icon" type="image/x-icon" href="${image}" />`;
      } else {
        pageTon.innerHTML = all;
      }
    }
  }
}
setInterval(changeName, 100);

document.addEventListener("DOMContentLoaded", function () {
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
  const info = document.createElement("div");
  const linkMacvg = document.createElement("a");
  (linkMacvg.href = "https://forms.gle/m7uEtoqaRQAtrccu6"), "_blank";
  linkMacvg.innerHTML = "Bug Report";
  info.classList.add("info-popup");
  info.innerHTML = "10 min till dawn" + linkMacvg;

  const button = document.createElement("img");
  const download = document.createElement("img");
  const back = document.createElement("img");
  const star = document.createElement("img");
  const question = document.createElement("img");
  const share = document.createElement("img");
  let element = document.documentElement;
  button.src = "/macvg/expand.svg";
  download.src = "/macvg/download.svg";
  back.src = "/macvg/back.svg";
  share.src = "/macvg/share-solid.svg";
  let nameabc = document.getElementById("macvgmacvg").getAttribute("name");
  let existingDataa = localStorage.getItem("favorites");
  let favoritesArray = existingDataa.split(",");
  const index = favoritesArray.indexOf(nameabc);
  if (index !== -1) {
    star.src = "/macvg/star-solid.svg";
  } else {
    star.src = "/macvg/star.svg";
  }
  question.src = "/macvg/circle-info-solid.svg";
  button.addEventListener("mouseover", function () {
    button.style.transform = "scale(1.2)";
  });
  button.addEventListener("mouseleave", function () {
    button.style.transform = "scale(1)";
  });
  button.style.width = "23px";
  button.style.height = "23px";
  button.style.borderRadius = "10px";
  button.style.backgroundColor = "black";
  button.style.cursor = "pointer";
  button.style.transition = "transform 0.2s ease";
  button.style.border = "none";
  button.style.padding = "7px";
  button.style.zIndex = "10000";
  button.title = "Full Screen!";
  button.style.boxSizing = "content-box";
  download.addEventListener("mouseover", function () {
    download.style.transform = "scale(1.2)";
  });
  download.addEventListener("mouseleave", function () {
    download.style.transform = "scale(1)";
  });
  download.addEventListener("click", function () {
    window.open("https://forms.gle/dqpitEzRd6rQbTVd7", "_blank");
  });
  download.style.width = "23px";
  download.style.height = "23px";
  download.style.border = "none";
  download.style.borderRadius = "10px";
  download.style.backgroundColor = "black";
  download.style.cursor = "pointer";
  download.style.transition = "transform 0.2s ease";
  download.style.padding = "7px";
  download.style.zIndex = "10000";
  download.title = "Download the Game!";
  download.style.boxSizing = "content-box";
  back.addEventListener("mouseover", function () {
    this.style.transform = "scale(1.2)";
  });
  back.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
  back.style.width = "23px";
  back.style.height = "23px";
  back.style.borderRadius = "10px";
  back.style.backgroundColor = "black";
  back.style.cursor = "pointer";
  back.style.transition = "transform 0.2s ease";
  back.style.border = "none";
  back.style.padding = "7px";
  back.style.zIndex = "10000";
  back.title = "Back to Home!";
  back.style.boxSizing = "content-box";
  star.addEventListener("mouseover", function () {
    this.style.transform = "scale(1.2)";
  });
  star.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
  star.addEventListener("click", function () {
    let name = document.getElementById("macvgmacvg").getAttribute("name");
    if (star.src.includes("star-solid")) {
      star.src = "/macvg/star.svg";
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
  star.style.width = "23px";
  star.style.height = "23px";
  star.style.fontSize = "18px";
  star.style.borderRadius = "10px";
  star.style.backgroundColor = "black";
  star.style.cursor = "pointer";
  star.style.transition = "transform 0.2s ease";
  star.style.border = "none";
  star.style.padding = "7px";
  star.style.zIndex = "10000";
  star.title = "Add to Favorites!";
  star.style.boxSizing = "content-box";
  button.addEventListener("click", function () {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      button.src = "/macvg/expand.svg";
    } else {
      element.requestFullscreen();
      button.src = "/macvg/compress.svg";
    }
  });
  back.addEventListener("click", function () {
    history.back();
  });
  question.addEventListener("mouseover", function () {
    this.style.transform = "scale(1.2)";
  });
  question.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
  question.addEventListener("click", function () {
    document.appendChild("a");
  });
  question.style.width = "23px";
  question.style.height = "23px";
  question.style.fontSize = "18px";
  question.style.borderRadius = "10px";
  question.style.backgroundColor = "black";
  question.style.cursor = "pointer";
  question.style.transition = "transform 0.2s ease";
  question.style.border = "none";
  question.style.padding = "7px";
  question.style.zIndex = "10000";
  question.title = "About Game!";
  question.style.boxSizing = "content-box";
  share.addEventListener("mouseover", function () {
    this.style.transform = "scale(1.2)";
  });
  share.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
  share.addEventListener("click", function () {
    let thing123 = window.location.href;
    navigator.clipboard.writeText(thing123);
    console.log(up2);
    console.log(body23);
    up2.style.display = "block";
  });
  share.style.width = "23px";
  share.style.height = "23px";
  share.style.fontSize = "18px";
  share.style.borderRadius = "10px";
  share.style.backgroundColor = "black";
  share.style.cursor = "pointer";
  share.style.transition = "transform 0.2s ease";
  share.style.border = "none";
  share.style.padding = "7px";
  share.style.zIndex = "10000";
  share.title = "Share Game!";
  share.style.boxSizing = "content-box";
  let isDragging = false;
  let offsetX, offsetY;
  let movableDiv = document.createElement("div");
  movableDiv.style.userSelect = "none";
  movableDiv.style.position = "fixed";
  movableDiv.style.top = "5px";
  movableDiv.style.left = "5px";
  movableDiv.style.backgroundColor = "black";
  movableDiv.style.color = "white";
  movableDiv.style.borderRadius = "10px";
  movableDiv.style.padding = "5px";
  movableDiv.style.display = "flex";
  movableDiv.style.flexDirection = "column";
  movableDiv.style.cursor = "move";
  movableDiv.style.zIndex = "9999";
  movableDiv.style.boxShadow = "0px 0px 10px black";

  movableDiv.addEventListener("mousedown", function (e) {
    isDragging = true;
    offsetX = e.clientX - movableDiv.getBoundingClientRect().left;
    offsetY = e.clientY - movableDiv.getBoundingClientRect().top;
  });

  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      let newTop = e.clientY - offsetY;
      let newWidth = e.clientX - offsetX;
      let maxHeight = window.innerHeight - movableDiv.offsetHeight;
      let maxWidth = window.innerWidth - movableDiv.offsetWidth;
      if (
        newTop >= 0 &&
        newTop <= maxHeight &&
        newWidth >= 0 &&
        newWidth <= maxWidth
      ) {
        movableDiv.style.top = newTop + "px";
        movableDiv.style.left = newWidth + "px";
      } else {
        isDragging = false;
        return;
      }
    }
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
  });
  const body = document.getElementsByTagName("body");
  let body2 = Array.from(body);
  body2[0].appendChild(movableDiv);
  movableDiv.appendChild(button);
  movableDiv.appendChild(back);
  movableDiv.appendChild(star);
  movableDiv.appendChild(download);
  movableDiv.appendChild(share);
  movableDiv.appendChild(question);
  const up = document.getElementById("macvg-pop");
  const off = document.getElementById("macvg-off");
  question.addEventListener("click", function () {
    up.classList.remove("macvg-close");
  });
  off.addEventListener("click", function () {
    up.classList.add("macvg-close");
  });
});

function feedback() {
  window.open("https://forms.gle/m7uEtoqaRQAtrccu6", "_blank");
}

document.addEventListener("DOMContentLoaded", function () {
  let thing23 = document.getElementById("current");
  let panicKeys = localStorage.getItem("panic");
  let href = localStorage.getItem("href");
  thing23.innerHTML =
    "Current key: " + panicKeys + "<br>" + " Redirecting: " + href;
  thing23.style.fontWeight = "bold";
  thing23.style.color = "gold";
});
*/
