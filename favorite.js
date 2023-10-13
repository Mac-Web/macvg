function search() {
  var searchTerm = document.getElementById("searchInput").value.toLowerCase();
  var list = document.getElementById("list");
  var items = list.getElementsByTagName("span");

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

function select() {
  const games = document.querySelectorAll(".game");
  let gamesf = Array.from(games);
  gamesf.forEach(function (game) {
    let og = game.innerHTML;
    game.addEventListener("click", function () {
      game.classList.toggle("selected");
      return;
    });
  });
}

      /*if (og.indexOf("Selected") === -1) {
        favorites[favorites.length] = og;
        console.log(favorites);
        game.innerHTML = og + "<div class='selected'>Selected</div>";
        return;
      } else if (og.indexOf("Selected") >= 0) {
        game.innerHTML = og.slice(0, -36);
      }
      if (game.classList.contains("selected")) {
        game.innerHTML = og.slice(0, -36);
        game.classList.remove("selected");
        return;
      } else {
        game.innerHTML = og + "<div class='selected'>Selected</div>";
        game.classList.add("selected");
        return;
      }*/

setInterval(select, 100);
