// Define your quiz questions and answers
const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Venus", "Saturn"],
        correct: "Mars",
    },
    {
        question: "What is the largest mammal in the world?",
        answers: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
        correct: "Blue Whale",
    },
    {
        question: "In which year did Christopher Columbus discover America?",
        answers: ["1492", "1620", "1776", "1832"],
        correct: "1492",
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: ["Go", "Au", "Ag", "Gi"],
        correct: "Au",
    },
];

const timePerQuestion = 20;
let currentQuestionIndex = 0;
let score = 0;
let timer;

//store player scores and names
const highScores = [];
//------------------------
// Elements
const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");
const questionText = document.getElementById("question-text");
const answersList = document.getElementById("answers");
const timeRemaining = document.getElementById("time-remaining");
const gameOverScreen = document.getElementById("game-over-screen");
const initialsInput = document.getElementById("initials");
const submitScoreButton = document.getElementById("submit-score");
const scoreDisplay = document.getElementById("score");

//------------------------------------------------
// start the quiz
function startQuiz() {
    startButton.style.display = "none";
    quizContainer.style.display = "block";
    loadQuestion(currentQuestionIndex);
    startTimer();
}
//------------------------------------------
// load a question
function loadQuestion(index) {
    if (index < questions.length) {
        const question = questions[index];
        questionText.textContent = question.question;
        answersList.innerHTML = "";
        question.answers.forEach((answer) => {
            const li = document.createElement("li");
            li.textContent = answer;
            li.addEventListener("click", () => checkAnswer(answer, question.correct));
            answersList.appendChild(li);
        });
    } else {
        endGame();
    }
}

// ----------------------------------------- the answer
function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score++;
    } else {
        timeRemaining.textContent = parseInt(timeRemaining.textContent) - 5;
    }

    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
}

// ------------------------------------- start the timer
function startTimer() {
    let time = timePerQuestion;
    timeRemaining.textContent = time;

    timer = setInterval(function () {
        time--;
        timeRemaining.textContent = time;

        if (time <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

// ---------------------------------------- end the game
function endGame() {
    clearInterval(timer);
    quizContainer.style.display = "none";
    gameOverScreen.style.display = "block";
    scoreDisplay.textContent = score;
}

//------------------------------------ Event listeners
startButton.addEventListener("click", startQuiz);
submitScoreButton.addEventListener("click", saveScore);
// ------------------------------------------------save the score and immediately display it
function saveScore() {
    const initials = initialsInput.value;
    if (initials) {
        const playerScore = { name: initials, score: score };
        highScores.push(playerScore);

        // ------------------------------Sort the highScores array by score in descending order
        highScores.sort((a, b) => b.score - a.score);

        // ---------------------------------------Save the highScores array to localStorage
        localStorage.setItem("highScores", JSON.stringify(highScores));

        // --------------------------Clear the initials input field
        initialsInput.value = "";

        // --------------------------------Display the saved score and initials immediately
        displaySavedScore(playerScore);
    }
}

//---------------------------------------------------display the saved score and initials
function displaySavedScore(playerScore) {
    const savedScoreContainer = document.getElementById("saved-score");
    savedScoreContainer.innerHTML = `<p>Score saved: ${playerScore.name}: ${playerScore.score}</p>`;
}
