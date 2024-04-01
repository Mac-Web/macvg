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
  let thing23 = document.getElementById("current");
  let panicKeys = localStorage.getItem("panic");
  let href = localStorage.getItem("href");
  if (panicKeys && href) {
    thing23.innerHTML =
      `<div class="panickeys">` +
      "<div>" +
      "Current key: " +
      panicKeys +
      "</div>" +
      "<div>" +
      " Redirecting: " +
      href +
      "</div>" +
      "</div>";
  } else if (panicKeys) {
    thing23.innerHTML =
      `<div class="panickeys">` +
      "<div>" +
      "Current key: " +
      panicKeys +
      "</div>" +
      "<div>" +
      " Redirecting: https://google.com" +
      "</div>" +
      "</div>";
  } else {
    thing23.innerHTML =
      `<div class="panickeys">` +
      "<div>" +
      "Current key: `" +
      "</div>" +
      "<div>" +
      " Redirecting: https://google.com" +
      "</div>" +
      "</div>";
  }
}

function url() {
  const inputurl = document.getElementById("name3").value;
  localStorage.setItem("href", "https://" + inputurl);
  let thing23 = document.getElementById("current");
  let panicKeys = localStorage.getItem("panic");
  let href = localStorage.getItem("href");
  if (panicKeys && href) {
    thing23.innerHTML =
      `<div class="panickeys">` +
      "<div>" +
      "Current key: " +
      panicKeys +
      "</div>" +
      "<div>" +
      " Redirecting: " +
      href +
      "</div>" +
      "</div>";
  } else if (panicKeys) {
    thing23.innerHTML =
      `<div class="panickeys">` +
      "<div>" +
      "Current key: " +
      panicKeys +
      "</div>" +
      "<div>" +
      " Redirecting: https://google.com" +
      "</div>" +
      "</div>";
  } else {
    thing23.innerHTML =
      `<div class="panickeys">` +
      "<div>" +
      "Current key: `" +
      "</div>" +
      "<div>" +
      " Redirecting: https://google.com" +
      "</div>" +
      "</div>";
  }
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

document.addEventListener("DOMContentLoaded", function load() {
  const close = document.getElementById("closea");
  close.addEventListener("click", function () {
    close.parentElement.parentElement.style.display = "none";
    localStorage.setItem("macvgcloseeee", "closed");
  });
  let thing23 = document.getElementById("current");
  let panicKeys = localStorage.getItem("panic");
  let href = localStorage.getItem("href");
  if (panicKeys && href) {
    thing23.innerHTML =
      `<div class="panickeys">` +
      "<div>" +
      "Current key: " +
      panicKeys +
      "</div>" +
      "<div>" +
      " Redirecting: " +
      href +
      "</div>" +
      "</div>";
  } else if (panicKeys) {
    thing23.innerHTML =
      `<div class="panickeys">` +
      "<div>" +
      "Current key: " +
      panicKeys +
      "</div>" +
      "<div>" +
      " Redirecting: https://google.com" +
      "</div>" +
      "</div>";
  } else {
    thing23.innerHTML =
      `<div class="panickeys">` +
      "<div>" +
      "Current key: `" +
      "</div>" +
      "<div>" +
      " Redirecting: https://google.com" +
      "</div>" +
      "</div>";
  }
});
