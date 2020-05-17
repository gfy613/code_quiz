var timerEl = document.getElementById("timer");
var quizEl = document.getElementById("quiz");
var questionEl = document.getElementById("question");
var answerListEl = document.getElementById("answer-list");
var startButtonEl = document.getElementById("start")
var scoreEl = document.getElementById("submitScore")
var userScoreEl = document.getElementById("userScore")
var highScoreEl = document.getElementById("highScore")
var userAnswer = '';
var userIdEl = document.querySelector("#userInitials")
var submitEl = document.getElementById("submit");
var userInt = '';
var bodyEl =document.querySelectorAll("body");
var highScoreButEl = document.getElementById("highScoreButtons")
var clearHighScoreEl = document.getElementById("clearHigh")
var restartQuizEl = document.getElementById("restart")
let timeLeft;
var questionNumber = 0;
var score = 0;
var mainHighScoreButEl = document.getElementById("highscoreButton")
var highScoreArray = [];
var quizInProgress = false;
var answerEl = document.getElementById("answer")


// function to start quiz by hiding the start button and unhiding the quiz
startButtonEl.addEventListener("click", startGame)
function startGame(){
    console.log(myQuestions.length);
    console.log("Start");
    startButtonEl.classList.add("hide");
    quizEl.classList.remove("hide");
    answerEl.classList.remove("hide");
    quizTimer();  
    setNextQuestion(); 
    quizInProgress = true;
    }

// // timer script
function quizTimer(){
    timeLeft=59
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
    for (i=0; i < myQuestions[questionNumber].answer.length; i++){
        button = document.createElement("button")
        button.innerText = myQuestions[questionNumber].answer[i]
        answerListEl.appendChild(button)
    }   
    console.log(myQuestions[questionNumber].correctAnswer)
    
}

function resetState() {
        while (answerListEl.firstChild) {
            answerListEl.removeChild(answerListEl.firstChild)
        }
}   

// Answer question  
    answerListEl.addEventListener("click",function(event){
        event.preventDefault();
        var correctChoice =  myQuestions[questionNumber].correctAnswer   
        console.log(questionNumber)
        if(event.target.matches("button")){
            console.log(event.target.innerText)
            var userAnswer = event.target.innerText
            questionNumber++
        }
            if(userAnswer === correctChoice){
                console.log("Correct")
                score = score + 10;
                userScoreEl.textContent = score
                if(questionNumber < myQuestions.length){
                    setNextQuestion()
                    answerEl.textContent = "Correct!!!"
                }
                else{
                    timeLeft = 0
                    enterHighscore()   
                }
                
            }
            else {
                console.log("Wrong")          
                if(questionNumber < myQuestions.length){
                    setNextQuestion()
                    timeLeft = timeLeft -5
                    answerEl.textContent = "Wrong"
                }
                else{
                    timeLeft = 0
                    enterHighscore()
                }
            }    
    });


function enterHighscore(){
    quizEl.classList.add("hide");
    answerEl.classList.add("hide");
    scoreEl.classList.remove("hide");
    
}

submitEl.addEventListener("click", recordHighscore)

function recordHighscore (event){    
    var userIdEl = document.querySelector("#userInitials")
    event.preventDefault();   
    userInt = userIdEl.value
    console.log(userInt)
    retrieveHighscore() 
    highScoreArray.push({name:userInt,score:score})
    highScoreArray.sort(function(a,b){
        return b.score - a.score
        })    
    storeHighscore()
    console.log("Check")
    scoreEl.classList.add("hide");
    startButtonEl.classList.add("hide");
    highScoreEl.classList.remove("hide");
    highScoreButEl.classList.remove("hide");
    showHighScores()
    console.log(highScoreArray)
   
}

function storeHighscore(){
    localStorage.setItem("highScoreArray",JSON.stringify(highScoreArray));
}

function retrieveHighscore(){
    highScoreArray = JSON.parse(localStorage.getItem("highScoreArray") || "[]")
}

// Create Highscore List
function showHighScores(){
    while (highScoreEl.firstChild) {
        highScoreEl.removeChild(highScoreEl.firstChild)
    }
    var rowEl = document.createElement("div")
        rowEl.setAttribute("class","row")
        var intials = document.createElement("strong")
        intials.setAttribute("class","col-6")
        intials.textContent =  "Initials"
        var score = document.createElement("strong")
        score.setAttribute("class","col-6")
        score.textContent = "Score"
        rowEl.appendChild(intials)
        rowEl.appendChild(score)
        highScoreEl.appendChild(rowEl)
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


restartQuizEl.addEventListener("click",function(){
    console.log("restart")
    event.preventDefault();  
    highScoreEl.classList.add("hide");
    highScoreButEl.classList.add("hide");
    questionNumber = 0
    timeLeft = 59
    score = 0
    answerEl.textContent = ""
    startGame()
});

clearHighScoreEl.addEventListener("click",function(){
    event.preventDefault() 
    console.log("clear")
    localStorage.clear()
    while (highScoreEl.firstChild) {
        highScoreEl.removeChild(highScoreEl.firstChild)
    }
    var rowEl = document.createElement("div")
        rowEl.setAttribute("class","row")
        var intials = document.createElement("strong")
        intials.setAttribute("class","col-6")
        intials.textContent =  "Initials"
        var score = document.createElement("strong")
        score.setAttribute("class","col-6")
        score.textContent = "Score"
        rowEl.appendChild(intials)
        rowEl.appendChild(score)
        highScoreEl.appendChild(rowEl)
});

mainHighScoreButEl.addEventListener("click",function(){
    if(quizInProgress){
        timeLeft = 0
        userScoreEl.textContent = score
    }
    else{
    console.log("Check")
    scoreEl.classList.add("hide");
    startButtonEl.classList.add("hide");
    highScoreEl.classList.remove("hide");
    highScoreButEl.classList.remove("hide");
    showHighScores()  
    }  

})

// Question Arrary
var myQuestions = [
    {   question: "Primarily, inside which tag of an HTML document do you put the JavaScript?",
        answer:["<java>", "<body>", "<script>", "<img>"],
        correctAnswer: "<script>",
    },
    {   question: "What is a DOM in JavaScript?",
        answer:["Data of Mine", "Document of Master", "Data Object Modal", "Document Object Model"],
        correctAnswer: "Document Object Model",
    },
    {   question: "Where is the correct place to insert a JavaScript?",
        answer:["The <head> section", "The <body> section" , "Both the <body> and <head> section", "the <java> section"],
        correctAnswer: "The <body> section",
    },
    {   question: "How do you create a function in JavaScript?",
        answer:["DoThis myFunction", "function:myFunction()" , "function = myFunction()", "function myfunction()"],
        correctAnswer: "function myfunction()",
    },
    {   question: "How do you call a function named myFunction?",
        answer:["do myFunction", "myFunction()" , "call myFunction()", "hello myFunction"],
        correctAnswer: "myFunction()",
    }
];



