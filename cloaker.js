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

function cloaking() {
  const name = document.getElementById("name").value;
  localStorage.cloak = name;
}

function changeName() {
  if (localStorage.title != null) {
    const pageTon = document.querySelector(".cloak");
    const favicon = document.querySelector(".favicon");
    let all = JSON.parse(localStorage.getItem("title"));
    let title = all[0];
    let image = all[1];
    pageTon.innerHTML = title;
    favicon.outerHTML = `<link class="favicon" rel="icon" type="image/x-icon" href="${image}" />`;
  }
}
setInterval(changeName, 100);
document.addEventListener("DOMContentLoaded", function () {
  const button = document.createElement("img");
  const download = document.createElement("img");
  const back = document.createElement("img");
  const star = document.createElement("img");
  const question = document.createElement("img");
  let element = document.documentElement;
  button.src = "/macvg/expand.svg";
  download.src = "/macvg/download.svg";
  back.src = "/macvg/back.svg";
  let nameabc = document.getElementById("macvgmacvg").getAttribute("name");
  let existingDataa = localStorage.getItem("favorites");
      let favoritesArray = existingDataa.split(",");
      const index = favoritesArray.indexOf(nameabc);
      if (index !== -1) {
        star.src = "/macvg/star-solid.svg";
      } else {
        star.src = "/macvg/star.svg";
      }
  question.src = "/macvg/flag.svg";
  button.addEventListener("mouseover", function () {
    button.style.transform = "scale(1.1)";
  });
  button.addEventListener("mouseleave", function () {
    button.style.transform = "scale(1)";
  });
  button.style.width = "23px";
  button.style.height = "23px";
  button.style.borderRadius = "10px";
  button.style.position = "fixed";
  button.style.top = "5px";
  button.style.left = "5px";
  button.style.backgroundColor = "black";
  button.style.boxShadow = "0px 0px 8px black";
  button.style.float = "left";
  button.style.cursor = "pointer";
  button.style.transition = "transform 0.2s ease";
  button.style.border = "none";
  button.style.padding = "7px";
  button.style.position = "fixed";
  button.style.zIndex = "10000";
  button.title = "Full Screen";
  button.style.boxSizing = "content-box";
  download.addEventListener("mouseover", function () {
    download.style.transform = "scale(1.1)";
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
  download.style.top = "140px";
  download.style.left = "5px";
  download.style.overflow = "scroll";
  download.style.borderRadius = "10px";
  download.style.backgroundColor = "black";
  download.style.boxShadow = "0px 0px 8px black";
  download.style.float = "left";
  download.style.cursor = "pointer";
  download.style.transition = "transform 0.2s ease";
  download.style.padding = "7px";
  download.style.position = "fixed";
  download.style.zIndex = "10000";
  download.title = "Download the Game!";
  download.style.boxSizing = "content-box";
  back.addEventListener("mouseover", function () {
    this.style.transform = "scale(1.1)";
  });
  back.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
  back.style.width = "23px";
  back.style.height = "23px";
  back.style.position = "fixed";
  back.style.top = "50px";
  back.style.left = "5px";
  back.style.borderRadius = "10px";
  back.style.backgroundColor = "black";
  back.style.boxShadow = "0px 0px 8px black";
  back.style.float = "left";
  back.style.cursor = "pointer";
  back.style.transition = "transform 0.2s ease";
  back.style.border = "none";
  back.style.padding = "7px";
  back.style.position = "fixed";
  back.style.zIndex = "10000";
  back.title = "Back to Home";
  back.style.boxSizing = "content-box";
  star.addEventListener("mouseover", function () {
    this.style.transform = "scale(1.1)";
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
      console.log(localStorage.getItem("favorites"));
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
      console.log(localStorage.getItem("favorites"));
    }
  });
  star.style.width = "23px";
  star.style.height = "23px";
  star.style.position = "fixed";
  star.style.top = "95px";
  star.style.left = "5px";
  star.style.fontSize = "18px";
  star.style.borderRadius = "10px";
  star.style.backgroundColor = "black";
  star.style.boxShadow = "0px 0px 8px black";
  star.style.float = "left";
  star.style.cursor = "pointer";
  star.style.transition = "transform 0.2s ease";
  star.style.border = "none";
  star.style.padding = "7px";
  star.style.position = "fixed";
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
    this.style.transform = "scale(1.1)";
  });
  question.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
  question.addEventListener("click", function () {
    window.open("https://forms.gle/m7uEtoqaRQAtrccu6", "_blank");
  });
  question.style.width = "23px";
  question.style.height = "23px";
  question.style.position = "fixed";
  question.style.top = "185px";
  question.style.left = "5px";
  question.style.fontSize = "18px";
  question.style.borderRadius = "10px";
  question.style.backgroundColor = "black";
  question.style.boxShadow = "0px 0px 8px black";
  question.style.float = "left";
  question.style.cursor = "pointer";
  question.style.transition = "transform 0.2s ease";
  question.style.border = "none";
  question.style.padding = "7px";
  question.style.position = "fixed";
  question.style.zIndex = "10000";
  question.title = "Bug Report";
  question.style.boxSizing = "content-box";
  const body = document.getElementsByTagName("body");
  let body2 = Array.from(body);
  body2[0].appendChild(button);
  body2[0].appendChild(star);
  body2[0].appendChild(back);
  body2[0].appendChild(download);
  body2[0].appendChild(question);
});
