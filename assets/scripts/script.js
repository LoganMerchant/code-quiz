var timerEl = document.querySelector('#timer');
var startButtonEl = document.querySelector('.start-btn');
var mainEl = document.querySelector("main");
var introEl = document.querySelector("#intro");


// var questions = [
//     {
//         question: "Which of the following languages provide a website with it's styling?",
//         option1: "HTML",
//         option2: "CSS",
//         option3: "Javascript",
//         option4: "JSON",
//         answer: questions.option2,
//     },
// ];

var startQuiz = function(questions) {
    mainEl.removeChild(introEl);
    mainEl.removeChild(startButtonEl);
    
    for (var i = 0; i < questions.length; i++) {
    }
}

startButtonEl.addEventListener('click', startQuiz);