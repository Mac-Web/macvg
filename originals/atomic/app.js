let energy = 0;
let energyPerSec = 0;
let atoms = 0;
let atomValue = 0.5;
let atomsPerClick = 1;
let atomsPerSecond = 0;
let btn = document.getElementById("clickButton");
let atomsE = document.getElementById("atoms");
let energyE = document.getElementById("energy");
let energyPerSecE = document.getElementById("eps");
let atomsPerClickE = document.getElementById("apc");
let atomsPerSecondE = document.getElementById("aps");
let upgradeBtn = document.getElementById("upgrades");
let popup = document.getElementById("popup");
let popupClose = document.getElementById("popup-close");
let upgradeBtns = document.querySelectorAll(".upgrade-btn");
let up1 = document.getElementById("up1");
let up2 = document.getElementById("up2");
let up3 = document.getElementById("up3");
let progress = localStorage.getItem("atomic-survival-progress");
let goldAtomE = document.getElementById("gold-atom");
let resetBtn = document.getElementById("reset");

if (progress) {
  savedArray = progress.split(",");
  let loadGameTime = new Date().getTime();
  let saveGameTime = parseInt(savedArray[0]);
  let timeDifference = loadGameTime - saveGameTime;
  let secondDifference = timeDifference / 1000;
  energy = parseInt(savedArray[1]);
  atoms = parseInt(savedArray[3]);
  energyPerSec = parseFloat(savedArray[2]);
  atomsPerSecond = parseInt(savedArray[8]);
  atomValue = parseFloat(savedArray[4]);
  atomsPerClick = parseInt(savedArray[5]);
  let totalIdleIncome = Math.floor(secondDifference * energyPerSec);
  let totalIdleAtoms = Math.floor(secondDifference * atomsPerSecond);
  atoms += totalIdleAtoms;
  energyPerSec += totalIdleAtoms * atomValue;
  energy += totalIdleIncome;
  alert(
    `While you were away, you earned ${totalIdleIncome} energy and generated ${totalIdleAtoms} new atoms!`
  );
  up1.innerHTML = parseInt(savedArray[6]);
  up2.innerHTML = parseInt(savedArray[7]);
  up3.innerHTML = parseInt(savedArray[9]);
  atomsPerClickE.innerHTML = `Atoms/click: ${atomsPerClick}`;
  energyPerSecE.innerHTML = `Energy/sec: ${energyPerSec.toFixed(1)}`;
  energyE.innerHTML = `Energy: ${Math.floor(energy)}`;
  atomsE.innerHTML = `Atoms: ${atoms}`;
  atomsPerSecondE.innerHTML = `Atoms/sec: ${atomsPerSecond}`;
  if (atomsPerClick > 1) {
    btn.innerHTML = `<img src="assets/atom.svg" />Get Atoms`;
  }
}

up1.addEventListener("click", () => {
  if (energy >= up1.innerHTML) {
    energy -= up1.innerHTML;
    up1.innerHTML *= 5;
    energyPerSec += (atoms * 0.1) / 2;
    atomValue *= 1.1;
  }
  checkUpgradable();
});

up2.addEventListener("click", () => {
  if (energy >= up2.innerHTML) {
    energy -= up2.innerHTML;
    up2.innerHTML *= 5;
    atomsPerClick++;
    btn.innerHTML = `<img src="assets/atom.svg" />Get Atoms`;
  }
  checkUpgradable();
});

up3.addEventListener("click", () => {
  if (energy >= up3.innerHTML) {
    energy -= up3.innerHTML;
    up3.innerHTML *= 5;
    atomsPerSecond++;
    atomsPerSecondE.innerHTML = `Atoms/sec: ${atomsPerSecond}`;
  }
  checkUpgradable();
});

document.addEventListener("keydown", function (e) {
  if (e.key === " ") {
    btn.style.transform = "translate(1px, 1px)";
    btn.style.boxShadow = "none";
  }
});
document.addEventListener("keyup", function (e) {
  if (e.key === " ") {
    newAtom();
    btn.style.transform = "translate(0px, 0px)";
    btn.style.boxShadow = "3px 3px 5px green";
  }
});
btn.addEventListener("mousedown", function () {
  btn.style.transform = "translate(1px, 1px)";
  btn.style.boxShadow = "none";
});

document.addEventListener("mouseup", function (e) {
  if (e.target === btn) {
    newAtom();
    btn.style.transform = "translate(0px, 0px)";
    btn.style.boxShadow = "3px 3px 5px green";
  } else {
    if ((btn.style.transform = "translate(-1px, -1px)")) {
      btn.style.transform = "translate(0px, 0px)";
      btn.style.boxShadow = "3px 3px 5px green";
    }
  }
});

upgradeBtn.addEventListener("click", () => {
  popup.style.visibility = "visible";
  popup.style.opacity = "1";
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("popup-drop") || e.target === popupClose) {
    popup.style.opacity = "0";
    popup.style.visibility = "hidden";
  }
});

resetBtn.addEventListener("click", () => {
  if (
    confirm(
      "Are you sure you want to reset your progress on Atomic Survival? This is NOT a prestige and will wipe everything from the game!"
    )
  ) {
    clearInterval(progressSaving);
    localStorage.removeItem("atomic-survival-progress");
    window.location.reload();
  }
});

function newAtom() {
  atoms += atomsPerClick;
  energyPerSec += atomValue * atomsPerClick;
  atomsE.innerHTML = `Atoms: ${atoms}`;
}

function newEnergy() {
  energy += energyPerSec;
  atomsPerClickE.innerHTML = `Atoms/click: ${atomsPerClick}`;
  energyPerSecE.innerHTML = `Energy/sec: ${energyPerSec.toFixed(1)}`;
  energyE.innerHTML = `Energy: ${Math.floor(energy)}`;
  checkUpgradable();
}

function autoAtom() {
  atoms += atomsPerSecond;
  energyPerSec += atomValue * atomsPerSecond;
  atomsE.innerHTML = `Atoms: ${atoms}`;
}

function checkUpgradable() {
  upgradeBtns.forEach((item) => {
    if (energy >= item.innerHTML) {
      item.style.backgroundColor = "green";
    } else {
      item.style.backgroundColor = "rgb(40,40,40)";
    }
  });
}

function saveProgress() {
  let time = new Date().getTime();
  let progressArray = [
    time,
    energy,
    energyPerSec,
    atoms,
    atomValue,
    atomsPerClick,
    up1.innerHTML,
    up2.innerHTML,
    atomsPerSecond,
    up3.innerHTML,
  ];
  localStorage.setItem("atomic-survival-progress", progressArray.join(","));
}

function goldAtom() {
  let onOff = Math.round(Math.random() * 2);
  let screenWidth = window.innerWidth - 200;
  let screenHeight = window.innerHeight - 200;
  let randomWidth = Math.round(Math.random() * screenWidth) + 100;
  let randomHeight = Math.round(Math.random() * screenHeight) + 100;
  if (onOff === 0) {
    goldAtomE.style.visibility = "visible";
    goldAtomE.style.top = randomHeight + "px";
    goldAtomE.style.left = randomWidth + "px";
    goldAtomE.onclick = () => {
      let random = Math.round(Math.random());
      if (random === 0) {
        if (energyPerSec === 0) {
          energy += 100;
        } else {
          energy += Math.floor(energyPerSec * 100);
        }
        goldAtomE.innerHTML = `Energy +${Math.floor(energyPerSec * 100)}`;
      } else {
        atoms += Math.floor(atomsPerClick * 100);
        energyPerSec += atomValue * atomsPerClick * 100;
        atomsE.innerHTML = `Atoms: ${atoms}`;
        goldAtomE.innerHTML = `Atoms +${Math.floor(atomsPerClick * 100)}`;
      }
      setTimeout(() => {
        goldAtomE.style.visibility = "hidden";
        goldAtomE.innerHTML = `<img src="assets/golden-atom.png" class="gold-atom" />`;
      }, 1500);
    };
    setTimeout(() => {
      goldAtomE.style.visibility = "hidden";
    }, 5000);
  }
}

setInterval(newEnergy, 1000);
setInterval(autoAtom, 1000);
let progressSaving = setInterval(saveProgress, 1000);
setInterval(goldAtom, 10000);
