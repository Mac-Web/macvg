document.addEventListener("DOMContentLoaded", function () {
  const recentList = document.getElementById("recentList");
  const games = document.getElementById("list");
  let items = games.getElementsByTagName("a");
  let thing = Array.from(items);
  let recents = localStorage.macvgRecents;
  let list = recents.split(",");
  let selectedGames = [];

  // Iterate through the list from local storage
  list.forEach((one) => {
    thing.forEach((game) => {
      let item = game.getAttribute("id");
      if (item === one) {
        const clonedGame = game.cloneNode(true);
        selectedGames.push(clonedGame);
        game.style.display = "flex";
      }
    });
  });

  // Append the selected games in the order of local storage to recentList
  selectedGames.forEach((element) => {
    element.setAttribute("name", element.innerHTML);
    element.style.paddingBottom = "12px";
    recentList.appendChild(element);
  });
});
