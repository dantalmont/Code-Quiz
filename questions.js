// declare variables
var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#start");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");
var secondsLeft = 90;
var holdInterval = 0;
var penalty = 10;
var generateQuestion = document.createElement("ul");


var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];

//functions
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                finish();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    generate(questionIndex);
});

function generate(questionIndex) { 
    questionsDiv.innerHTML = "";
    generateQuestion.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(generateQuestion);
        generateQuestion.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv"); 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    questionIndex++;

    if (questionIndex >= questions.length) {
        finish();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        generate(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
function finish() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Results"

    questionsDiv.appendChild(createH1);

    var finalScoreEl = document.createElement("p");
    finalScoreEl.setAttribute("id", "finalScoreEl");

    questionsDiv.appendChild(finalScoreEl);

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        finalScoreEl.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    var userInitials = document.createElement("label");
    userInitials.setAttribute("id", "createLabel");
    userInitials.textContent = "Enter your initials: ";

    questionsDiv.appendChild(userInitials);
    var userInput = document.createElement("input");
    userInput.setAttribute("type", "text");
    userInput.setAttribute("id", "initials");
    userInput.textContent = "";

    questionsDiv.appendChild(userInput);

    var confirmInitials = document.createElement("button");
    confirmInitials.setAttribute("type", "submit");
    confirmInitials.setAttribute("id", "confirmInitials");
    confirmInitials.textContent = "Submit";

    questionsDiv.appendChild(confirmInitials);

    confirmInitials.addEventListener("click", function () {
        var initials = userInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("./highscore.html");
        }
    });

}