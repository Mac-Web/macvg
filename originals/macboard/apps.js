function search() {
  var searchTerm = document.getElementById("searchInput").value.toLowerCase();
  var list = document.getElementById("list");
  var items = list.getElementsByTagName("div");
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var itemText = item.innerText.toLowerCase();

    if (itemText.includes(searchTerm)) {
      item.style.display = "flex"; // Show the anchor tag
    } else {
      item.style.display = "none"; // Hide the anchor tag
    }
  }
}

function volume() {
  let sounds = document.getElementsByTagName("audio");
  const volumeI = document.getElementById("volume").value;
  Array.from(sounds).forEach(function (sound) {
    sound.volume = volumeI;
  });
}

function playAll() {
  let sounds = document.getElementsByTagName("audio");
  Array.from(sounds).forEach(function (sound) {
    sound.play();
  });
}

function stopAll() {
  const els = document.getElementsByTagName("AUDIO");
  Array.from(els).forEach((el) => {
    el.load();
  });
}

function select() {
  let list = document.getElementById("list");
  let items = list.getElementsByTagName("div");
  let itemsL = Array.from(items);
  let r = Math.random();
  let rw = Math.floor(r * 169);
  let selected = items[rw];
  itemsL.forEach(function (item) {
    if (item.contains(selected)) {
      let list = document.getElementById("randomList");
      item.setAttribute("name", item.innerHTML);
      item.style.paddingBottom = "12px";
      list.innerHTML = item.outerHTML;

      console.log(item);
    } else {
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setInterval(() => {
    let theme = localStorage.getItem("theme");
    console.log(theme);
    if (theme === "light") {
      const root = document.documentElement;
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
      root.style.setProperty("--shadow-color", "0px 5px 5px rgb(25,25,25)");
      root.style.setProperty("--black-color", "black");
      root.style.setProperty("--bg-color", "black");
      root.style.setProperty("--bg-color-2", "black");
      root.style.setProperty("--group-bg-color", "black");
      root.style.setProperty("--bar-color", "black");
      root.style.setProperty("--border", "rgb(50,50,50)");
    } else {
      const root = document.documentElement;
      root.style.setProperty("--text-color", "white");
      root.style.setProperty("--shadow-color", "transparent");
      root.style.setProperty("--black-color", "black");
      root.style.setProperty("--bg-color", "rgb(50, 50, 50)");
      root.style.setProperty("--bg-color-2", "white");
      root.style.setProperty("--group-bg-color", "rgba(40, 40, 40, 0.7)");
      root.style.setProperty("--bar-color", "rgb(70, 70, 70)");
    }
  }, 100);
  setInterval(volume, 500);
});
