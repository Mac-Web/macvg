document.addEventListener("DOMContentLoaded", function () {
  const games = document.querySelectorAll(".game");

  games.forEach(function (game) {
    game.addEventListener("mouseover", function () {
      let innerThing = game.innerHTML;
      game.setAttribute("name", innerThing);
    });
  });
});

function gotIt() {
  const tip = document.querySelector(".tip");
  tip.style.display = "none";
  localStorage.setItem("closed", "yes");
}
