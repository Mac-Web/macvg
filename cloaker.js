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
    const pageTitle = document.querySelector(".cloak");
    const favicon = document.querySelector(".favicon");
    let all = JSON.parse(localStorage.getItem("title"));
    let title = all[0];
    let image = all[1];
    pageTitle.innerHTML = title;
    favicon.outerHTML = `<link class="favicon" rel="icon" type="image/x-icon" href="${image}" />`;
  }
}

setInterval(changeName, 100);
