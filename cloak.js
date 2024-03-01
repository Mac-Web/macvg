document.addEventListener("keydown", (event) => {
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
  const close = document.getElementById("closea");
  close.addEventListener("click", function () {
    close.parentElement.parentElement.style.display = "none";
    localStorage.setItem("macvgclosee", "closed");
  });
  let thing23 = document.getElementById("current");
    let panicKeys = localStorage.getItem("panic");
    let href = localStorage.getItem("href");
    if (panicKeys && href) {
      thing23.innerHTML =
      "Current key: " + panicKeys + "<br>" + " Redirecting: " + href;
    } else if (panicKeys) {
      thing23.innerHTML =
      "Current key: " + panicKeys + "<br>" + " Redirecting: https://google.com";
    } else {
      thing23.innerHTML =
      "Current key: `" + "<br>" + " Redirecting: https://google.com";
    }
});
