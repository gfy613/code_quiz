var timerEl = document.getElementById("timer");
var quizEl = document.getElementById("quiz");
var questionEl = document.getElementById("question");
var answerListEl = document.getElementById("answer-list");
var startButtonEl = document.getElementById("start")
var scoreEl = document.getElementById("submitScore")
var userScoreEl = document.getElementById("userScore")
var highScoreEl = document.getElementById("highScore")
var questionNumber = 0;
var userAnswer = '';
var score = 0;
var userIdEl = document.querySelector("#userInitials")
// var highScoreArray = [{name: "Gaines",
//                        score: 1} 
// ];
// var highScoreArray = [];
var submitEl = document.getElementById("submit");
var timeLeft = 9;
var userInt = '';
var bodyEl =document.querySelectorAll("body");
var highScoreButEl = document.getElementById("highScoreButtons")


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
                    timeleft = 0
                }
                
            }
            else {
                console.log("Wrong")
                questionNumber++                
                if(questionNumber < myQuestions.length){
                    setNextQuestion()
                    timeLeft = timeLeft -5
                    
                }
                else{
                    enterHighscore()
                    timeLeft = 0
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
    {   question: "Primarily, inside which tag of an HTML document do you put the JavaScript?",
        answer:["<java>", "<body>", "<script>", "<img>"],
        correctAnswer: "<script>",
    },
    {   question: "question 2",
        answer:["w","x","y","z"],
        correctAnswer: "w",
    },

];


submitEl.addEventListener("click", recordHighscore)

function recordHighscore (event){    
    var userIdEl = document.querySelector("#userInitials")
    event.preventDefault();   
    userInt = userIdEl.value
    console.log(userInt)
    highScoreArray = JSON.parse(localStorage.getItem("highScoreArray") || "[]")
    highScoreArray.push({name:userInt,score:score})
    highScoreArray.sort(function(a,b){
        return b.score - a.score
        })    
    localStorage.setItem("highScoreArray",JSON.stringify(highScoreArray));
    showHighScores()
    console.log(highScoreArray)
   
}


// Create Highscore List
function showHighScores(){
  
    console.log("Check")
    scoreEl.classList.add("hide");
    startButtonEl.classList.add("hide");
    highScoreEl.classList.remove("hide");
    highScoreButEl.classList.remove("hide");

    for(var i =0; i<highScoreArray.length;i++){

        var rowEl = document.createElement("div")
        rowEl.setAttribute("class","row")
        var intials = document.createElement("div")
        intials.setAttribute("class","col-6")
        intials.textContent =  highScoreArray[i].name 
        var score = document.createElement("div")
        score.setAttribute("class","col-6")
        score.textContent = highScoreArray[i].score
        rowEl.appendChild(intials)
        rowEl.appendChild(score)
        highScoreEl.appendChild(rowEl)
    }
}


// clear
// localStorage.clear();
// history.back

// restart

// highscore = JSON.parse(localStorage.getItem("highscore")||"[]"),























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



