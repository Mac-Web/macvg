let score = 0;
let display = 0;
let clickValue = 1;
let secValue = 0;
let upgrade1Cost = 10;
let upgrade2Cost = 20;
let upgrade3Cost = 30;
let btn = document.getElementById("clickButton");
let up1 = document.getElementById("upgrade1");
let up2 = document.getElementById("upgrade2");
let up3 = document.getElementById("upgrade3");
let upc1 = document.getElementById("cost1");
let upc2 = document.getElementById("cost2");
let upc3 = document.getElementById("cost3");
let ppc = document.getElementById("ppc");
let pps = document.getElementById("pps");

if (localStorage.getItem("cosmicClickerScore")) {
  score = localStorage.getItem("cosmicClickerScore");
  score = Number(score);
  updateScoreDisplay();
}
if (localStorage.getItem("cosmicClickerApc")) {
  clickValue = localStorage.getItem("cosmicClickerApc");
  clickValue = Number(clickValue);
  ppc.innerHTML = clickValue;
}
if (localStorage.getItem("cosmicClickerAps")) {
  secValue = localStorage.getItem("cosmicClickerAps");
  secValue = Number(secValue);
  pps.innerHTML = secValue;
}
document.addEventListener("keydown", function (e) {
  if (e.key === " ") {
    btn.style.transform = "translate(1px, 1px)";
    btn.style.boxShadow = "none";
  }
});
document.addEventListener("keyup", function (e) {
  if (e.key === " ") {
    score += clickValue;
    btn.style.transform = "translate(0px, 0px)";
    btn.style.boxShadow = "3px 3px 5px green";
    updateScoreDisplay();
  }
});
btn.addEventListener("mousedown", function () {
  btn.style.transform = "translate(1px, 1px)";
  btn.style.boxShadow = "none";
});
document.addEventListener("mouseup", function (e) {
  if (e.target === btn) {
    score += clickValue;
    updateScoreDisplay();
    btn.style.transform = "translate(0px, 0px)";
    btn.style.boxShadow = "3px 3px 5px green";
  } else {
    if ((btn.style.transform = "translate(-1px, -1px)")) {
      btn.style.transform = "translate(0px, 0px)";
      btn.style.boxShadow = "3px 3px 5px green";
    }
  }
});
up1.addEventListener("click", function () {
  if (score >= upgrade1Cost) {
    clickValue += 0.25;
    score -= upgrade1Cost;
    upgrade1Cost = Math.floor(upgrade1Cost * 1.5);
    updateScoreDisplay();
    upc1.innerHTML = upgrade1Cost;
  }
});
up2.addEventListener("click", function () {
  if (score >= upgrade2Cost) {
    clickValue += 0.5;
    score -= upgrade2Cost;
    upgrade2Cost = Math.floor(upgrade2Cost * 1.5);
    updateScoreDisplay();
    upc2.innerHTML = upgrade2Cost;
  }
});
up3.addEventListener("click", function () {
  if (score >= upgrade3Cost) {
    clickValue += 1;
    score -= upgrade3Cost;
    upgrade3Cost = Math.floor(upgrade3Cost * 1.75);
    updateScoreDisplay();
    upc3.innerHTML = upgrade3Cost;
  }
});
function updateScoreDisplay() {
  display = Math.floor(score);
  ppc.innerHTML = clickValue;
  document.getElementById("score").textContent = `Atoms: ${display}`;
}

function saveProgress() {
  localStorage.setItem("cosmicClickerScore", score);
  localStorage.setItem("cosmicClickerApc", clickValue);
  //localStorage.setItem("cosmicClickerAps", )
}

setInterval(saveProgress, 1000);
