document.addEventListener("DOMContentLoaded", function () {
  const favoriteList = document.getElementById("favoriteList");
  const games = document.getElementById("list");
  let items = games.getElementsByTagName("a");
  let thing = Array.from(items);
  let favorites = localStorage.favorites;
  let list = favorites.split(",");
  let clonedElements = [];
  const header = document.createElement("h1");
  header.innerHTML = "Favorites";
  header.classList.add("favorite-h");
  favoriteList.appendChild(header);
  list.forEach((one) => {
    thing.forEach((game) => {
      let item = game.getAttribute("id");
      if (item === one) {
        const clonedGame = game.cloneNode(true);
        clonedElements.push(clonedGame);
        game.style.display = "flex";
      }
    });
  });
  clonedElements.sort((a, b) => {
    let idA = a.getAttribute("id");
    let idB = b.getAttribute("id");
    return idA.localeCompare(idB);
  });
  clonedElements.forEach((element) => {
    element.setAttribute("name", element.innerHTML);
    element.style.paddingBottom = "12px";
    favoriteList.appendChild(element);
  });
});
