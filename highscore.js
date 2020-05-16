var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var home = document.querySelector("#home");

clear.addEventListener("click", function (){
    localStorage.clear();
    location.reload();
});

var scoreLi = localStorage.getItem("allScores");
scoreLi = JSON.parse(scoreLi);

if (scoreLi !== null) {
    for (var i = 0; i < scoreLi.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = scoreLi[i].initials + " " + scoreLi[i].score;
        highScore.appendChild(createLi);

    }
}

home.addEventListener("click", function() {
    window.location.replace("./index.html");
});