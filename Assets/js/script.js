var timerEl = document.getElementById("timer");
var quizEl = document.getElementById("quiz");
var questionEl = document.getElementById("question");
var answerListEl = document.getElementById("answer-list");
var startButtonEl = document.getElementById("start-button")
var scoreEl = document.getElementById("submitScore")
var userScoreEl = document.getElementById("userScore")
var highScoreEl = document.getElementById("highScore")
var questionNumber = 0;
var userAnswer = '';
var score = 0;
var highScoreArray = [{name: "Gaines",
                       score: 10,} 
];
var submitEl = document.getElementById("submit");




// function to start quiz by hiding the start button and unhiding the quiz
startButtonEl.addEventListener("click", startGame)
function startGame(){
    console.log(myQuestions.length);
    console.log("Start");
    startButtonEl.classList.add("hide");
    quizEl.classList.remove("hide");
    quizTimer();  
    setNextQuestion(); 
    }

// // timer script
function quizTimer(){
    var timeLeft = 10;
    var timeInterval = setInterval(function(){
        timerEl.textContent = "Time: " + timeLeft;
        timeLeft--;    
 
    if (timeLeft <= 0){
        timerEl.textContent = "";
        clearInterval(timeInterval);
        enterHighscore();
    }
    }, 1000);
}



// Set up next question
function setNextQuestion (){
    resetState()
    // showQuestion()
    questionEl.innerText = myQuestions[questionNumber].question;
    for (i=0; i<myQuestions[questionNumber].answer.length; i++){
        button = document.createElement("button")
        button.innerText = myQuestions[questionNumber].answer[i]
        answerListEl.appendChild(button)
    }
    answerQuestion()
    }

 function resetState() {
        while (answerListEl.firstChild) {
            answerListEl.removeChild(answerListEl.firstChild)
        }
      }   

// Answer question  
function answerQuestion(){  
    var correctChoice =  myQuestions[questionNumber].correctAnswer   
    answerListEl.addEventListener("click",function(event){
        event.preventDefault();
        if(event.target.matches("button")){
            console.log(event.target.innerText)
            var userAnswer = event.target.innerText
        }
       
            if(userAnswer == correctChoice){
                console.log("Correct")
                questionNumber++
                score = score + 10;
                userScoreEl.textContent = score
                if(questionNumber < myQuestions.length){setNextQuestion()}
                else{
                    enterHighscore()
                    timerEl.classList.add("hide")
                }
                
            }
            else {
                console.log("Wrong")
                questionNumber++                
                if(questionNumber < myQuestions.length){
                    setNextQuestion()
                }
                else{
                    enterHighscore()
                    timerEl.classList.add("hide")
                }
            }
        
        
    });
};



function enterHighscore(){
    quizEl.classList.add("hide");
    scoreEl.classList.remove("hide");
}

// Question Arrary
var myQuestions = [
    {   question: "question 1",
        answer:["a","b","c","d"],
        correctAnswer: "c",
    },
    {   question: "question 2",
        answer:["w","x","y","z"],
        correctAnswer: "w",
    },

];


submitEl.addEventListener("click", recordHighscore)

function recordHighscore (){
    
    highScoreArray.push({name: "g", score: userScore })

    showHighScores()
    console.log(highScoreArray)
}



// Create Highscore List
function showHighScores(){
    console.log("Check")
    scoreEl.classList.add("hide");
    startButtonEl.classList.add("hide");
    highScoreEl.classList.remove("hide");

    for(var i =0; i<highScoreArray.length;i++){
        var highScore = highScoreArray[i];
        var li = document.createElement("li");
        li.textContent= highScore;
        li.setAttribute("data-index", i);
        highScoreEl.appendChild(li);
    }
}























// var questions = [
//     {
//         title: "Primarily, inside which tag of an HTML document do you put the JavaScript?",
//         choices: ["<java>", "<body>", "<script>", "<img>"],
//         answer: "<script>"
//     },
//     {
//         title: "The condition in an if/else statement is enclosed within ______.",
//         choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
//         answer: "parentheses"
//     },
//     {
//         title: "What is the syntax for referencing an external script called 'abc.js'?",
//         choices: ["<script class='abc.js'>", "<script href='abc.js'>", "<script link='abc.js'>", "<script src='abc.js'>"],
//         answer: "<script src='abc.js'>"
//     },
//     {
//         title: "Which type of pop up box will allow a user to type a response?",
// //         choices: ["input", "prompt", "alert", "confirm"],
// //         answer: "prompt"
// //     },
// //     {
// //         title: "What is a DOM in JavaScript?",
// //         choices: ["Data of Mine", "Document of Master", "Data Object Modal", "Document Object Model"],
// answer: "Document Object Model"
// },
// {
//     title: "Is JS case-sensitive?",
//     choices: ["Yes", "No", "I have no clue", "Only when it feels like it."],
//     answer: "Yes"
// },
// ];



