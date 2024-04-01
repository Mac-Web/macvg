/*
SEAN MADE THIS.
https://plus.google.com/u/0/101749103627562194088/

This is where the main magic happens. That's about it.
*/
document.querySelector("#play").onclick = function () {
  document.querySelector("#menu").className = "bufanda";
  document.querySelector("#title").className = "bufanda";
  play("init");
};
function play(sceneId) {
  var scene = story[sceneId];
  switch (scene[1]) {
    case 0:
      document.querySelector("#sceneType0").className = "active";
      document.querySelector(".active .message").innerHTML = scene[0];
      if (scene[2] == "END" || scene[2] == "WIN") {
        document.querySelector("#score").className = scene[2].toLowerCase();
        setTimeout(function () {
          document.querySelector("#score").className = "";
        }, 2000);
      }
      var giggles = function () {
        document.querySelector(".active .btn").removeEventListener("click", giggles);
        document.querySelector("#sceneType0").className = "inactive";
        if (scene[2] == "END" || scene[2] == "WIN") {
          document.querySelector("#menu").className = "billyLa";
          document.querySelector("#title").className = "billyLa";
        }
        setTimeout(function () {
          document.querySelector("#sceneType0").className = "";
          if (scene[2] == "END" || scene[2] == "WIN") {
            document.querySelector("#menu").className = "";
            document.querySelector("#title").className = "";
          } else if (scene[2] == "SPECIAL CASE") {
            play("blablaok" + Math.floor(Math.random() * 2));
          } else {
            play(scene[2]);
          }
        }, 500);
      };
      document.querySelector(".active .btn").onclick = giggles;
      break;
    case 1:
      document.querySelector("#sceneType1").className = "active";
      document.querySelector(".active .message").innerHTML = scene[0];
      document.querySelector(".active .choices tr").innerHTML = "";
      for (var i = 0; i < scene[2].length; i += 2) {
        var s = document.createElement("TD");
        s.innerHTML = scene[2][i];
        s.id = "choice" + scene[2][i + 1];
        document.querySelector(".active .choices tr").appendChild(s);
      }
      var giggles = function (e) {
        if (e.target.id.slice(6)) {
          document.querySelector(".active .choices").removeEventListener("click", giggles);
          document.querySelector("#sceneType1").className = "inactive";
          setTimeout(function () {
            document.querySelector("#sceneType1").className = "";
            if (scene[3] == "SPECIAL CASE") {
              play(["10", "freedom"][Math.random() < 0.15 ? 1 : 0]);
            } else {
              play(e.target.id.slice(6));
            }
          }, 500);
        }
      };
      document.querySelector(".active .choices").onclick = giggles;
      break;
    case 2:
      document.querySelector("#sceneType2 input[type=number]").value = "";
      document.querySelector("#sceneType2").className = "active";
      document.querySelector(".active .message").innerHTML = scene[0];
      var giggles = function () {
        document.querySelector(".active .btn").removeEventListener("click", giggles);
        document.querySelector("#sceneType2").className = "inactive";
        setTimeout(function () {
          document.querySelector("#sceneType2").className = "";
          if (scene[2] == document.querySelector("#sceneType2 input[type=number]").value) {
            play(scene[3]);
          } else {
            play(scene[4]);
          }
        }, 500);
      };
      document.querySelector(".active .btn").onclick = giggles;
      break;
  }
}
// this is for 3kh0.github.io, stop copying shit you skids