var timerEl = document.querySelector('#timer');
var startButtonEl = document.querySelector('.start-btn');
var mainEl = document.querySelector("main");
var introEl = document.querySelector("#intro");


var questions = [
    {
        question: "Which of the following is responsible for the way a page is styled?",
        option1: "HTML",
        option2: "CSS",
        option3: "Javascript",
        option4: "JSON",
        // answer: questions.option2,
    },
];

var startTimer = function(questions) {
    var timeLeft = 3;
    var timeInterval = setInterval(function() {
        if (timeLeft > 1) {
            timerEl.textContent = (timeLeft + " seconds left...");
            timeLeft--;
        }
        else if (timeLeft === 1) {
            timerEl.textContent = (timeLeft + ' second left...');
            timeLeft--;
        }
        else if (timeLeft < 1) {
            timerEl.textContent = "Time's Up!";
            clearInterval(timeInterval);
            endGame();
        }
    }, 1000); 
};

var startQuiz = function() {
    var buttonContainerEl = document.createElement('div');
    buttonContainerEl.className = "btn-container";

    var answerButtonEl1 = document.createElement('button');
    var answerButtonEl2 = document.createElement('button');
    var answerButtonEl3 = document.createElement('button');
    var answerButtonEl4 = document.createElement('button');
    answerButtonEl1.className = "btn";
    answerButtonEl2.className = "btn";
    answerButtonEl3.className = "btn";
    answerButtonEl4.className = "btn";


    mainEl.removeChild(startButtonEl);
    mainEl.appendChild(buttonContainerEl);

    for (var i = 0; i < questions.length; i++) {
        introEl.textContent = questions[i].question;

        buttonContainerEl.appendChild(answerButtonEl1);
        answerButtonEl1.textContent = questions[i].option1;

        buttonContainerEl.appendChild(answerButtonEl2);
        answerButtonEl2.textContent = questions[i].option2;
        
        buttonContainerEl.appendChild(answerButtonEl3);
        answerButtonEl3.textContent = questions[i].option3;

        buttonContainerEl.appendChild(answerButtonEl4)
        answerButtonEl4.textContent = questions[i].option4;
    };
}

var endGame = function() {
    
};

startButtonEl.addEventListener('click', startTimer);
startButtonEl.addEventListener('click', startQuiz);