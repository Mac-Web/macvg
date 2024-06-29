document.addEventListener("DOMContentLoaded", function () {
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
});

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
  let rw = Math.floor(r * 180);
  let selected = items[rw];
  itemsL.forEach(function (item) {
    if (item.contains(selected)) {
      let list = document.getElementById("randomList");
      item.setAttribute("name", item.innerHTML);
      item.style.paddingBottom = "12px";
      list.innerHTML = item.outerHTML;
    } else {
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const clearFavorite = document.getElementById("fvrbtn");
  clearFavorite.addEventListener("click", () => {
    localStorage.removeItem("macBoardFavorites");
    favoriteList.style.visibility = "hidden";
    favoriteList.style.height = "0";    
    favoriteList.style.margin = "0";
  })
  setInterval(() => {
    let theme = localStorage.getItem("theme");
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
      root.style.setProperty("--sound-color", second);
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
  }, 100);
  setInterval(volume, 500);
  const soundElements = document.querySelectorAll(".sound");
  soundElements.forEach((selement) => {
    let repeat = document.createElement("button");
    let downloads = document.createElement("a");
    let favoritesound = document.createElement("button");
    favoritesound.innerHTML =
      '<img src="/macvg/media/star-regular.svg" id="favoritesound" title="Favorite Sound">';
    favoritesound.classList.add("repeatbtn");
    favoritesound.style.marginRight = "51px";
    favoritesound.style.borderRadius = "5px 0px 0px 5px";
    let soundName = selement
      .getElementsByTagName("audio")[0]
      .getAttribute("src");
    downloads.innerHTML = `<img src="/macvg/media/download.svg" title="Download Sound">`;
    downloads.setAttribute("href", soundName);
    downloads.setAttribute("target", "_blank");
    downloads.setAttribute("download", "");
    downloads.classList.add("downloadbtn");
    repeat.innerHTML = '<img src="repeat-solid.svg" title="Repeat Sound">';
    repeat.classList.add("repeatbtn");
    repeat.addEventListener("click", () => {
      let repeatLoop = setInterval(() => {
        selement.getElementsByTagName("audio")[0].play();
      }, 500);
      const stopbtn = document.getElementById("stopall");
      stopbtn.addEventListener("click", () => {
        clearInterval(repeatLoop);
      });
    });

    favoritesound.addEventListener("click", () => {
      if (favoritesound.innerHTML.includes("star-solid")) {
        let existing = localStorage.getItem("macBoardFavorites");
        let data = existing.split(",");
        data.splice(data.indexOf(soundName) - 1, 1);
        if (data.length > 0) {
          localStorage.setItem("macBoardFavorites", data.join(","));
        } else {
          localStorage.removeItem("macBoardFavorites");
        }
        window.location.reload();
      } else {
        if (localStorage.macBoardFavorites) {
          let existing = localStorage.getItem("macBoardFavorites");
          let data = existing.split(",");
          data.push(soundName);
          localStorage.setItem("macBoardFavorites", data.join(","));
          window.location.reload();
        } else {
          localStorage.setItem("macBoardFavorites", soundName);
          window.location.reload();
        }
      }
    });

    selement.appendChild(repeat);
    selement.appendChild(downloads);
    selement.appendChild(favoritesound);
  });
  favorite();
});

function favorite() {
  const favoriteList = document.getElementById("favoriteList");
  const sounds = document.getElementById("list");
  let items = sounds.querySelectorAll(".sound");
  let thing = Array.from(items);
  let favorites = localStorage.macBoardFavorites;
  if (favorites) {
    favoriteList.style.visibility = "visible";
    favoriteList.style.height = "auto";
    favoriteList.style.marginTop = "20px";
    favoriteList.style.marginBottom = "25px";
  } else {
    favoriteList.style.visibility = "hidden";
    favoriteList.style.height = "0";    
    favoriteList.style.margin = "0";
  }
  let list = favorites.split(",");
  let clonedElements = [];
  const header = document.createElement("h1");
  header.innerHTML = "Favorites";
  header.classList.add("favorite-h");
  favoriteList.appendChild(header);
  list.forEach((one) => {
    thing.forEach((game) => {
      let item = game.getElementsByTagName("audio")[0].getAttribute("src");
      if (item === one) {
        clonedElements.push(game);
        game.style.display = "flex";
        game
          .querySelector("#favoritesound")
          .setAttribute("src", "/macvg/media/star-solid.svg");
      }
    });
  });
  clonedElements.forEach((element) => {
    favoriteList.appendChild(element);
  });
}
