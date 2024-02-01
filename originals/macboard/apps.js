setInterval(volume, 500);

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
