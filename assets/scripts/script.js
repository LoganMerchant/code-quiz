var highScoresEl = document.querySelector('#high-scores');
var timerEl = document.querySelector('#timer');
var mainEl = document.querySelector("main");
var titleEl = document.querySelector('.title')
var descriptionEl = document.querySelector("#description");
var startButtonEl = document.querySelector('#start-btn');
var index = 0;
var timeLeft = 60;
var score = 0;

var questionsObj = [
    {
        question: "What are the two main components of an HTML document?",
        choice1: "<head> & <body>",
        choice2: "<head> & <main>",
        choice3: "<body> & <main>",
        choice4: "<button> & </button>",
        answer: '0',
    },
    {
        question: "What does the <a> tag in an HTML document stand for?",
        choice1: "Acronym",
        choice2: 'Anchor',
        choice3: 'Arbitrary',
        choice4: 'Apple',
        answer: '1',
    },
    {
        question: "What does HTML stand for?",
        choice1: "Hypertext Markdown Language",
        choice2: "Hot Text Makeup Language",
        choice3: "Hypertext Markup Language",
        choice4: "It's just a name",
        answer: '2',
    },
    {
        question: "What purpose does CSS fulfill?",
        choice1: "It styles an HTML document.",
        choice2: "It tells an HTML document how to perform.",
        choice3: "It's a modern version of HTML.",
        choice4: "It stores data on a server.",
        answer: '0',
    },
    {
        question: "What does CSS stand for?",
        choice1: "Continuous Style Sheets",
        choice2: "Crazy Stylish Sheets",
        choice3: "Cascading Sheets of Style",
        choice4: "Cascading Style Sheets",
        answer: '3',
    },
    {
        question: "Which brackets encompass CSS declarations?",
        choice1: "[ ]",
        choice2: "{ }",
        choice3: "( )",
        choice4: "< >",
        answer: '1',
    },
    {
        question: "What is the common abbreviation for JavaScript?",
        choice1: "J/S",
        choice2: "JScript",
        choice3: "JavaS",
        choice4: "JS",
        answer: '3',
    },
    {
        question: "Which HTML tags are needed to link a Javascript document?",
        choice1: "<script> </script>",
        choice2: "<java> </java>",
        choice3: "<js> </js>",
        choice4: "<program> </program>",
        answer: '0',
    },
    {
        question: "What is the code within a JavaScript function commonly called?",
        choice1: "JavaScript Code",
        choice2: "Logic",
        choice3: "Commands",
        choice4: "Function Occurances",
        answer: '1',
    },
    {
        question: "JavaScript objects hold data in which of the following ways?",
        choice1: "function: parameter",
        choice2: "value: class",
        choice3: "property: value",
        choice4: "class: value",
        answer: '2',
    },
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
    descriptionEl.remove();
    startButtonEl.remove();

    var quizContainerEl = document.createElement('div');
    quizContainerEl.className = "quiz-container";

    var titleEl = document.createElement('h1');
    titleEl.className = 'title'

    var quizChoicesContainer = document.createElement('ul');
    quizChoicesContainer.className = "content"
    
    var quizAnswerConfirm = document.createElement('p');
    quizAnswerConfirm.className = 'answer-confirm';

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
    var quizChoicesContainer = document.querySelector('.content');
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
        timeLeft = 0;
    };
};

var endQuiz = function() {
    var quizContainerEl = document.querySelector('.quiz-container');
    quizContainerEl.remove();    

    var scoreInputContainerEl = document.createElement('form');
    scoreInputContainerEl.className = "content";

    var scoreInput = document.createElement('input');
    scoreInput.setAttribute('placeholder', 'Your Name');
    scoreInput.setAttribute('name', 'name')
    scoreInput.setAttribute('type', 'text');

    var scoreSubmit = document.createElement('button');
    scoreSubmit.className = 'btn';
    scoreSubmit.textContent = "Submit";
    scoreSubmit.setAttribute('id', 'submit-btn');
    scoreSubmit.setAttribute('type', 'submit');
    scoreSubmit.setAttribute('value', "Submit");
    
    timeLeft = 0;
    
    if (score < localStorage.getItem('score')) {
        window.alert('You did not beat the high score.')
        location.reload();
    } else if (score >= localStorage.getItem('score')) {
        window.alert('Congrats! You beat the high score!')
    };

    titleEl.textContent = "Quiz Finished";
    scoreInputContainerEl.innerHTML = '<label>Save your score of ' + score + '!</label>';

    scoreInputContainerEl.appendChild(scoreInput);
    scoreInputContainerEl.appendChild(scoreSubmit);
    mainEl.appendChild(scoreInputContainerEl);

    scoreInputContainerEl.addEventListener('submit', saveHighScoreHandler);
};

var clickedAnswerHandler = function(event) {
    var quizAnswerConfirm = document.querySelector('.answer-confirm');
    var eventTarget = event.target;
    var targetEl = eventTarget.getAttribute('data-id');

    if (targetEl === questionsObj[index].answer) {
        quizAnswerConfirm.textContent = "Correct!";
        score++;
    } else {
        quizAnswerConfirm.textContent = 'Incorrect!';
        timeLeft = (timeLeft - 5);
    }

    index++;

    return formatQuestions(questionsObj);
};

var saveHighScoreHandler = function(event) {
    event.preventDefault();
    var name = document.querySelector('input[name="name"]').value;

    if (!name) {
            window.alert('Please enter your name.');
            return;
    };

    localStorage.setItem('score', score);
    localStorage.setItem('name', name);
    location.reload();
};

startButtonEl.addEventListener('click', startQuiz);
startButtonEl.addEventListener('click', startTimer);