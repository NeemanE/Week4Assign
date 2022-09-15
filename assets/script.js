//variables
var quizMain = document.getElementById("quiz");
var quizResults = document.getElementById("results");
var endScore = document.getElementById("endScore");
var quizEnd = document.getElementById("quizFinish");
var questions = document.getElementById("quizQuestions");
var timeRemaining = document.getElementById("timeRemaining");
var startButton = document.getElementById("start-button");
var quizHomepage = document.getElementById("quiz-home");
var leaderboardTable = document.getElementById("leaderboard-table");
var leaderboards = document.getElementById("leaderboards");
var inputInitials = document.getElementById("initials");
var leaderboardName = document.getElementById("leaderboard-initials");
var promptButtons = document.getElementById("promptButtons");
var scoreSubmit = document.getElementById("submit-score");
var leaderboardScore = document.getElementById("leaderboard-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

//declaring answers and questions to be displayed. questions taken from w3schools js quiz
var testQuestions = [{
    question: "Inside which HTML element do we put the JavaScript?",
    respondA: "js",
    respondB: "scripting",
    respondC: "script",
    respondD: "javascript",
    correctAnswer: "c"
},

{
    question: "How do you write 'Hello World' in an alert box?",
    respondA: "msgBox('Hello World');",
    respondB: "alert('Hello World'); ",
    respondC: "msg('Hello World');",
    respondD: "alertBox('Hello World');",
    correctAnswer: "b"
},

{
    question: "How do you round the number 7.25, to the nearest integer??",
    respondA: "rnd(7.25)",
    respondB: "Math.round(7.25)",
    respondC: "round(7.25)",
    respondD: "Math.rnd(7.25)",
    correctAnswer: "b"
},

{
    question: "How do you find the number with the highest value of x and y?",
    respondA: "Math.max(x, y)",
    respondB: "Math.ceil(x, y)",
    respondC: "top(x, y)",
    respondD: "ceil(x, y)",
    correctAnswer: "a"
},

{
    question: "Which event occurs when the user clicks on an HTML element??",
    respondA: "onmouseover",
    respondB: "onchange",
    respondC: "onmouseclick",
    respondD: "onclick",
    correctAnswer: "d"
},

{
    question: "How do you declare a JavaScript variable??",
    respondA: "v carName;",
    respondB: "variable carName;",
    respondC: "var carName;",
    respondD: "vari carName;",
    correctAnswer: "c"
},

{
    question: "How to write an IF statement in JavaScript??",
    respondA: "if i == 5 then",
    respondB: "if i = 5 then",
    respondC: "if (i == 5)",
    respondD: "if i = 5",
    correctAnswer: "c"
},
];
//variables to track questions and time
var trackQuestionDone = testQuestions.length;
var trackQuestion = 0;
var quizTime = 80;
var quizTimerCount;
var score = 0;
var correct;

//function that displays questions and answers to user
function pullQuizQuestion() {
    quizEnd.style.display = "none";
    if (trackQuestion === trackQuestionDone) {
        return displayScore();
    }
    var currentQuestion = testQuestions[trackQuestion];
    questions.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.respondA;
    buttonB.innerHTML = currentQuestion.respondB;
    buttonC.innerHTML = currentQuestion.respondC;
    buttonD.innerHTML = currentQuestion.respondD;
};

//begins timer, hides homepage, and displays first question
function quizStart() {
    quizEnd.style.display = "none";
    quizHomepage.style.display = "none";
    pullQuizQuestion();

    //display timer alongside question
    quizTimerCount = setInterval(function () {
        quizTime--;
        timeRemaining.textContent = "Time left: " + quizTime;

        if (quizTime === 0) {
            clearInterval(quizTimerCount);
            displayScore();
        }
    }, 1000);
    quizMain.style.display = "block";
}
// displays final score after finishing questions or running out of time
function displayScore() {
    quizMain.style.display = "none"
    quizEnd.style.display = "flex";
    clearInterval(quizTimerCount);
    inputInitials.value = "";
    endScore.innerHTML = "You answered " + score + " out of " + testQuestions.length + " questions correctly";
}

//adding the function to the score submit button that takes the quiz takers name and stores it
scoreSubmit.addEventListener("click", function highscore() {


    if (inputInitials.value === "") {
        alert("Please Input your Name/Initials");
        return false;
    } else {
        var localHighscore = JSON.parse(localStorage.getItem("localHighscore")) || [];
        var thisPlayer = inputInitials.value;
        var currentScore = {
            name: thisPlayer,
            score: score
        };

        quizEnd.style.display = "none";
        leaderboardTable.style.display = "flex";
        leaderboards.style.display = "block";
        promptButtons.style.display = "flex";

        localHighscore.push(currentScore);
        localStorage.setItem("localHighscore", JSON.stringify(localHighscore));
        calculateScore();

    }

});

//function that sets the scores to a blank value before pulling new values from local storage

function calculateScore() {
    leaderboardName.innerHTML = "";
    leaderboardScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("localHighscore")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newLeaderName = document.createElement("li");
        var newScoreNumber = document.createElement("li");
        newLeaderName.textContent = highscores[i].name;
        newScoreNumber.textContent = highscores[i].score;
        leaderboardName.appendChild(newLeaderName);
        leaderboardScore.appendChild(newScoreNumber);
    }
}

//shows scores while hiding other quiz elements
function showScore() {
    quizHomepage.style.display = "none"
    quizEnd.style.display = "none";
    leaderboardTable.style.display = "flex";
    leaderboards.style.display = "block";
    promptButtons.style.display = "flex";

    calculateScore();
}

// removes scores from both local storage and the leaderboard
function resetScore() {
    window.localStorage.clear();
    leaderboardName.textContent = "";
    leaderboardScore.textContent = "";
}

//sets the page to default alongside the quiz elements
function restartQuiz() {
    leaderboardTable.style.display = "none";
    quizEnd.style.display = "none";
    quizHomepage.style.display = "flex";
    quizTime = 80;
    score = 0;
    trackQuestion = 0;
}

// Validates the questions to see if they are correct
function validateAnswer(answer) {
    correct = testQuestions[trackQuestion].correctAnswer;

    if (answer === correct && trackQuestion !== trackQuestionDone) {
        score++;
        trackQuestion++;
        pullQuizQuestion();
    } else if (answer !== correct && trackQuestion !== trackQuestionDone) {
        quizTime = quizTime - 10;
        trackQuestion++;
        pullQuizQuestion();
    }
    else {
        displayScore();
    }
}

//starts quiz 
startButton.addEventListener("click", quizStart);

