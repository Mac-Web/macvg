const bar = document.getElementById("sidebar");
const overflowMenu = document.getElementById("overflow-menu");
document.addEventListener("click", function () {
  bar.classList.remove("movingbar");
});
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("shoot")) {
    overflowMenu.classList.add("menu-slide");
  } else {
    overflowMenu.classList.remove("menu-slide");
  }
});
document.addEventListener("mousemove", function (event) {
  if (event.clientX <= 5 && bar.classList.contains("movingbar") !== true) {
    bar.classList.add("movingbar");
  }
});

//**Above is the universal code for every MacWeb JavaScript file**//

const google = ["Google", "/macvg/media/google.png"];
const canva = ["Home - Canva", "/macvg/media/canva.png"];
const clever = ["Clever | Portal", "/macvg/media/clever.png"];
const schoology = ["Home | Schoology", "/macvg/media/schoology.png"];
const newTab = ["New Tab", "/macvg/media/new-tab.png"];

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
  favicon.outerHTML = `<link class="favicon" rel="icon" type="image/x-icon" href="/macvg/media/logo.png" />`;
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

//Above are the codes for tab cloaker and panic key

const filterAll = document.getElementById("filter-all");
const filterAction = document.getElementById("filter-action");
const filterStrategy = document.getElementById("filter-strategy");
const filterCasual = document.getElementById("filter-casual");
const filterDriving = document.getElementById("filter-driving");
const sortName = document.getElementById("sort-name");
const sortCatagory = document.getElementById("sort-catagory");
let filterGamesList = document.getElementById("list");

let newArray = [];
let secondArray = [];
let everythingArray = [];
let data;
fetch("games.json")
  .then((response) => response.json())
  .then((dataa) => {
    data = dataa.games;
    for (var i = 0; i < data.length; i++) {
      newArray.push(data[i]);
    }
    everythingArray = newArray;
    secondArray = newArray;
    sortStuff(secondArray, "name");
    targetLabel.innerHTML = "Sort By: Name";
  })
  .catch((error) => console.error("Error fetching data:", error));

document.addEventListener("click", (e) => {
  let eTarget = e.target;
  let targetLabel = eTarget.parentElement.parentElement.children[0];
  if (eTarget === filterAction) {
    filterStuff(everythingArray, "action");
    targetLabel.innerHTML = "Action & Adventure (150)";
  } else if (eTarget === filterStrategy) {
    filterStuff(everythingArray, "strategy");
    targetLabel.innerHTML = "Strategy & Puzzle (116)";
  } else if (eTarget === filterCasual) {
    filterStuff(everythingArray, "casual");
    targetLabel.innerHTML = "Casual & Idle (52)";
  } else if (eTarget === filterDriving) {
    filterStuff(everythingArray, "driving");
    targetLabel.innerHTML = "Driving & Sports (42)";
  } else if (eTarget === filterAll) {
    sortStuff(everythingArray, "name");
    targetLabel.innerHTML = "Filter All (360)";
  } else if (eTarget === sortName) {
    targetLabel.innerHTML = "Sort By: Name";
    sortStuff(secondArray, "name");
  } else if (eTarget === sortCatagory) {
    targetLabel.innerHTML = "Sort By: Catagory";
    sortStuff(secondArray, "catagory");
  }
});

function sortStuff(targetArray, key) {
  if (key === "name") {
    targetArray.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    newArray = targetArray;
    let finalArrayIds = [];
    let finalGames = [];
    targetArray.forEach((item) => {
      finalArrayIds.push(item.id);
      finalGames.push(item.name);
    });
    arrangeBoxes(finalGames, finalArrayIds);
  } else if (key === "catagory") {
    targetArray.sort((a, b) => {
      const nameA = a.catagory.toUpperCase();
      const nameB = b.catagory.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    newArray = targetArray;
    let finalArrayIds = [];
    let finalGames = [];
    targetArray.forEach((item) => {
      finalArrayIds.push(item.id);
      finalGames.push(item.name);
    });
    arrangeBoxes(finalGames, finalArrayIds);
  }
}

function filterStuff(colorArray, color) {
  if (
    color === "action" ||
    color === "strategy" ||
    color === "casual" ||
    color === "driving"
  ) {
    let finalArray = [];
    let finalArrayIds = [];
    colorArray.forEach((item) => {
      if (item.catagory === color) {
        finalArray.push(item.name);
        finalArrayIds.push(item.id);
      }
    });
    secondArray = finalArray;
    arrangeBoxes(finalArray, finalArrayIds);
  } else {
    let finalArrayIds = [];
    let finalArrayNames = [];
    everythingArray.forEach((item) => {
      finalArrayIds.push(item.id);
      finalArrayNames.push(item.name);
    });
    arrangeBoxes(finalArrayNames, finalArrayIds);
  }
}

function arrangeBoxes(newArrayy, newIds) {
  filterGamesList.innerHTML = "";
  let arrayIndex = 0;
  newArrayy.forEach((element) => {
    let newBox = document.createElement("a");
    newBox.classList.add("game");
    newBox.setAttribute("id", `game${newIds[arrayIndex]}`);
    newBox.innerHTML = element;
    filterGamesList.appendChild(newBox);
    let computedStyle = window.getComputedStyle(newBox).backgroundImage;
    let computedStylee = computedStyle.substring(
      computedStyle.indexOf(`url("`) + 5
    );
    const projectsPosition = computedStylee.indexOf("projects/");
    const slashIndex = computedStylee.indexOf(
      "/",
      projectsPosition + "projects/".length
    );
    let computedStyleee = computedStylee.substring(0, slashIndex);
    filterGamesList.removeChild(newBox);
    newBox.setAttribute("href", computedStyleee);
    filterGamesList.appendChild(newBox);
    arrayIndex++;
  });
}

//Above are the codes for filtering and sorting

function updateTheme() {
  let theme = localStorage.getItem("theme");
  if (theme === "light") {
    const root = document.documentElement;
    root.style.setProperty("--link", "rgb(225, 139, 9)");
    root.style.setProperty("--text-color", "black");
    root.style.setProperty("--shadow-color", "0px 0px 5px rgb(84, 84, 84)");
    root.style.setProperty("--black-color", "rgb(235, 235, 235)");
    root.style.setProperty("--bg-color", "rgb(235, 235, 235)");
    root.style.setProperty("--bg-color-2", "rgb(30, 30, 30)");
    root.style.setProperty("--group-bg-color", "rgb(140, 140, 140, 0.7)");
    root.style.setProperty("--bar-color", "rgb(200, 200, 200)");
  } else if (theme === "deep") {
    const root = document.documentElement;
    root.style.setProperty("--text-color", "white");
    root.style.setProperty("--link", "rgb(225, 139, 9)");
    root.style.setProperty("--shadow-color", "0px 5px 5px rgb(25,25,25)");
    root.style.setProperty("--black-color", "black");
    root.style.setProperty("--bg-color", "black");
    root.style.setProperty("--bg-color-2", "black");
    root.style.setProperty("--group-bg-color", "black");
    root.style.setProperty("--bar-color", "black");
    root.style.setProperty("--border", "rgb(50,50,50)");
  } else if (theme === "cyber") {
    const root = document.documentElement;
    root.style.setProperty("--link", "rgb(225, 139, 9)");
    root.style.setProperty("--text-color", "white");
    root.style.setProperty("--shadow-color", "0px 5px 5px #42053f");
    root.style.setProperty("--black-color", "black");
    root.style.setProperty("--bg-color", "#0b023a");
    root.style.setProperty("--bg-color-2", "#ff00a0");
    root.style.setProperty("--group-bg-color", "rgba(48, 4, 98, 0.7)");
    root.style.setProperty("--bar-color", "#12827e");
    root.style.setProperty("--border", "rgb(50,50,50)");
  } else if (theme === "custom") {
    const root = document.documentElement;
    let first = localStorage.getItem("first");
    let second = localStorage.getItem("second");
    document.documentElement.style.setProperty("--bg-color", first);
    document.documentElement.style.setProperty("--bar-color", second);
    document.documentElement.style.setProperty("--link", second);
    document.documentElement.style.setProperty("--text-color", "white");
    document.documentElement.style.setProperty("--black-color", "black");
    root.style.setProperty("--shadow-color", "transparent");
    root.style.setProperty("--bg-color-2", "white");
    root.style.setProperty("--group-bg-color", second);
  } else {
    const root = document.documentElement;
    root.style.setProperty("--text-color", "white");
    root.style.setProperty("--link", "rgb(225, 139, 9)");
    root.style.setProperty("--shadow-color", "transparent");
    root.style.setProperty("--black-color", "black");
    root.style.setProperty("--bg-color", "rgb(50, 50, 50)");
    root.style.setProperty("--bg-color-2", "white");
    root.style.setProperty("--group-bg-color", "rgba(40, 40, 40, 0.7)");
    root.style.setProperty("--bar-color", "rgb(70, 70, 70)");
  }
}

function glowingTitle() {
  let hue = 0;
  const root = document.documentElement;
  setInterval(() => {
    hue = (hue + 3) % 360;
    root.style.setProperty("--f-t-color", `hsl(${hue}, 100%, 70%)`);
    root.style.setProperty("--s-t-color", `hsl(${hue + 60}, 100%, 70%)`);
    root.style.setProperty("--t-t-color", `hsl(${hue + 130}, 100%, 70%)`);
  }, 300);
}

function setGameNames() {
  const games = document.querySelectorAll(".game");
  games.forEach(function (game) {
    game.addEventListener("mouseover", function () {
      let innerThing = game.innerHTML;
      game.setAttribute("name", innerThing);
    });
  });
}

function select() {
  let list = document.getElementById("list");
  let items = list.getElementsByTagName("a");
  let itemsL = Array.from(items);
  let r = Math.random();
  let rw = Math.floor(r * 275);
  let selected = items[rw];
  itemsL.forEach(function (item) {
    if (item.contains(selected)) {
      let list = document.getElementById("randomList");
      item.setAttribute("name", item.innerHTML);
      item.style.paddingBlock = "10px";
      list.innerHTML = item.outerHTML;
    } else {
    }
  });
}
function gotIt() {
  const tip = document.querySelector(".tip");
  tip.style.display = "none";
  localStorage.setItem("cccse", "yes");
}

function search() {
  var searchTerm = document.getElementById("searchInput").value.toLowerCase();
  var list = document.getElementById("list");
  var items = list.getElementsByTagName("a");

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var itemText = item.innerText.toLowerCase();

    if (itemText.includes(searchTerm)) {
      item.style.display = "flex";
      item.style.width = "110px";
      item.style.height = "110px";
      item.style.marginInline = "5px";
      item.style.marginBlock = "6px";
      item.style.paddingInline = "10px";
      item.style.paddingBottom = "10px";
    } else {
      item.style.width = "0";
      item.style.height = "0";
      item.style.padding = "0";
      item.style.margin = "0";
    }
  }
}

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

setGameNames();
changeName();
updateTheme();
glowingTitle();
