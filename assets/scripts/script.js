var highScoresEl = document.querySelector('#high-scores');
var timerEl = document.querySelector('#timer');
var mainEl = document.querySelector("main");
var titleEl = document.querySelector('.title')
var infoEl = document.querySelector(".info");
var startButtonEl = document.querySelector('#start-btn');
var index = 0;
var timeLeft = 30;
var score = 0;

var questionsObj = [
    {
        question: "Which of the following is responsible for the way a page is styled?",
        choice1: "HTML",
        choice2: "CSS",
        choice3: "Javascript",
        choice4: "JSON",
        answer: '1',
    },
    {
        question: "What brackets are used to store properties in an array?",
        choice1: "[ ]",
        choice2: '{ }',
        choice3: '( )',
        choice4: '< >',
        answer: '0',
    },
    {
        question: "Guinness tastes good?",
        choice1: "Yes",
        choice2: "No",
        choice3: "Eh",
        choice4: "Maybe",
        answer: '0',
    }
];

var startTimer = function() {
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

var startQuiz = function() {
    infoEl.remove();
    startButtonEl.remove();

    var quizContainerEl = document.createElement('div');
    quizContainerEl.className = "quiz-container";

    var titleEl = document.createElement('h1');
    titleEl.className = 'title'

    var quizChoicesContainer = document.createElement('ul');
    quizChoicesContainer.className = "btn-container"
    
    var quizAnswerConfirm = document.createElement('p');
    quizAnswerConfirm.className = 'info'

    quizContainerEl.appendChild(titleEl);

    for (i = 0; i < 4; i++) {
        var quizChoicesEl = document.createElement('li');
        quizChoicesEl.className = "btn";    

        quizChoicesEl.setAttribute('data-id', [i]); 
        quizChoicesContainer.appendChild(quizChoicesEl);
    };
    quizContainerEl.appendChild(quizChoicesContainer);
    quizContainerEl.appendChild(quizAnswerConfirm);
    mainEl.appendChild(quizContainerEl);

    formatQuestions(questionsObj);
};

var formatQuestions = function(questionsObj) {
    var quizChoicesContainer = document.querySelector('.btn-container');
    var titleEl = document.querySelector('.title');
    var quizChoice1 = document.querySelector('li[data-id="0"]');
    var quizChoice2 = document.querySelector('li[data-id="1"]');
    var quizChoice3 = document.querySelector('li[data-id="2"]');
    var quizChoice4 = document.querySelector('li[data-id="3"]');

    if (index < questionsObj.length) {
        titleEl.textContent = questionsObj[index].question;
        quizChoice1.textContent = questionsObj[index].choice1;
        quizChoice2.textContent = questionsObj[index].choice2;
        quizChoice3.textContent = questionsObj[index].choice3;
        quizChoice4.textContent = questionsObj[index].choice4;

        quizChoicesContainer.addEventListener('click', clickedAnswerHandler);
    } else {
        endQuiz();
    };
};

var endQuiz = function() {
    var quizContainerEl = document.querySelector('.quiz-container');
    quizContainerEl.remove();

    timeLeft = 0;

    var quizContainerEl = document.createElement('form');
    quizContainerEl.className = "quiz-container";

    titleEl.textContent = "Quiz Finished";
    quizContainerEl.innerHTML = '<label>Save your score!</label> <input type="text" name="name" placeholder="Your Name"></input> <h3>Your score: ' + score + '. <button type="submit" value="Submit">Submit</button>';

    console.log(quizContainerEl);
    mainEl.appendChild(quizContainerEl);

    if (score < localStorage.getItem('score')) {
        window.alert('You did not beat the high score.')
        location.reload();
    }

    quizContainerEl.addEventListener('submit', saveHighScoreHandler);
};

var clickedAnswerHandler = function(event) {
    var quizAnswerConfirm = document.querySelector('.info');
    var eventTarget = event.target;
    var targetEl = eventTarget.getAttribute('data-id');

    if (targetEl === questionsObj[index].answer) {
        quizAnswerConfirm.textContent = "Correct!";
        score++;
    } else {
        quizAnswerConfirm.textContent = 'Incorrect!';
        timeLeft = (timeLeft - 3);
    }

    index++;

    return formatQuestions(questionsObj);
};

var saveHighScoreHandler = function() {
    var name = document.querySelector('input[name="name"]').value;
    if (!name) {
            window.alert('Please enter your name.')
            return endQuiz();
        };

    window.alert('Congrats! You beat the high score!')
    localStorage.setItem('score', score);
    localStorage.setItem('name', name);
};

startButtonEl.addEventListener('click', startQuiz);
startButtonEl.addEventListener('click', startTimer);