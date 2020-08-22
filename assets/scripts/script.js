var timerEl = document.querySelector('#timer');
var startButtonEl = document.querySelector('.start-btn');
var mainEl = document.querySelector("main");
var introEl = document.querySelector("#intro");


var questions = [
    {
        question: "Which of the following languages provide a website with it's styling?",
        option1: "HTML",
        option2: "CSS",
        option3: "Javascript",
        option4: "JSON",
        // answer: questions.option2,
    },
];

var startQuiz = function(questions) {
    var timeLeft = 10;
    var timeInterval = setInterval(function() {
        if (timeLeft > 1) {
            timerEl.textContent = (timeLeft + " seconds left.");
            timeLeft--;
        }
        else if (timeLeft = 1) {
            timerEl.textContent = (timeLeft + ' second left.');
            timeLeft--;
        }
        else if (timeLeft < 1) {
            timerEl.textContent = "";
            clearInterval(timeInterval);
            // endGame();
        }
    }, 1000); 

    for (var i = 0; i < questions.length; i++) {
        introEl.textContent = questions[i].question;
    };
};

startButtonEl.addEventListener('click', startQuiz);