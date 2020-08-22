var highScoresEl = document.querySelector('#high-scores');
var timerEl = document.querySelector('#timer');
var mainEl = document.querySelector("main");
var titleEl = document.querySelector('.title')
var infoEl = document.querySelector(".info");
var startButtonEl = document.querySelector('#start-btn');


var questionsObj = [
    {
        question: "Which of the following is responsible for the way a page is styled?",
        choice1: "HTML",
        choice2: "CSS",
        choice3: "Javascript",
        choice4: "JSON",
        answer: this.choice2,
    },
];

var startTimer = function() {
    var timeLeft = 30;
    var timeInterval = setInterval(function() {
        if (timeLeft > 1) {
            timerEl.textContent = ('Time Left: ' + timeLeft + ' seconds');
            timeLeft--;
        }
        else if (timeLeft === 1) {
            timerEl.textContent = ('Time Left: ' + timeLeft + ' second');
            timeLeft--;
        }
        else if (timeLeft < 1) {
            timerEl.textContent = "Time's Up!";
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000); 
};

var formatQuiz = function() {
    titleEl.remove();
    infoEl.remove();
    startButtonEl.remove();

    var quizContainerEl = document.createElement('div');
    quizContainerEl.className = "quiz-container";

    var quizQuestionEl = document.createElement('h1');
    quizQuestionEl.className = 'title'

    var quizChoicesContainer = document.createElement('div');
    quizChoicesContainer.className = "btn-container"
    
    var quizAnswerConfirm = document.createElement('p');
    quizAnswerConfirm.className = 'info'

    quizContainerEl.appendChild(quizQuestionEl);

    for (i = 0; i < 4; i++) {
        var quizChoicesEl = document.createElement('button');
        quizChoicesEl.className = "btn";    

        quizChoicesEl.setAttribute('data-id', [i]); 
        quizChoicesContainer.appendChild(quizChoicesEl);
    };
    quizContainerEl.appendChild(quizChoicesContainer);
    quizContainerEl.appendChild(quizAnswerConfirm);
    mainEl.appendChild(quizContainerEl);

    startQuiz();
};

var startQuiz = function(questionsObj) {

}

var endQuiz = function() {
    
};

startButtonEl.addEventListener('click', formatQuiz);
startButtonEl.addEventListener('click', startTimer);