let questions = [
    {
        question: "What will be the output of the following code?\n\n<code>console.log(typeof null);</code>",
        options: ["'object'", "'null'", "'undefined'", "'number'"],
        answer: 0
    },
    {
        question: "What will be the output of the following code?\n\n<code>console.log(1 + '1');</code>",
        options: ["'2'", "'11'", "'NaN'", "'SyntaxError'"],
        answer: 1
    },
    {
        question: "What will be the output of the following code?\n\n<code>let a = [1, 2, 3];\nlet b = a;\nb.push(4);\nconsole.log(a);</code>",
        options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4, 1, 2, 3]", "[1, 2, 3, 4, 4]"],
        answer: 1
    },
    {
        question: "What will be the output of the following code?\n\n<code>console.log(0.1 + 0.2 === 0.3);</code>",
        options: ["true", "false", "'0.3'", "'NaN'"],
        answer: 1
    },
    {
        question: "What will be the output of the following code?\n\n<code>function foo() {\n  return\n  {\n    bar: 'hello'\n  };\n}\nconsole.log(foo());</code>",
        options: ["undefined", "{ bar: 'hello' }", "null", "SyntaxError"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 600; // 10 minutes in seconds
let selectedAnswers = [];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("start-quiz").onclick = startQuiz;
    document.getElementById("next-button").onclick = loadNextQuestion;
    document.getElementById("submit-button").onclick = submitQuiz;
    document.getElementById("try-again").onclick = tryAgain;
    document.getElementById("check-answers").onclick = checkAnswers;
});

function startQuiz() {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    startTimer();
    loadQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = formatTime(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question").innerHTML = question.question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    question.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "option";
        optionElement.innerText = option;
        optionElement.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionElement);
    });
    updateProgressBar();
    updateButtons();
}

function selectOption(index) {
    selectedAnswers[currentQuestionIndex] = index;
    document.querySelectorAll('.option').forEach((option, idx) => {
        option.classList.remove('selected');
        if (idx === index) {
            option.classList.add('selected');
        }
    });
}

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        submitQuiz();
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress");
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + "%";
}

function updateButtons() {
    if (currentQuestionIndex === questions.length - 1) {
        document.getElementById("next-button").style.display = "none";
        document.getElementById("submit-button").style.display = "block";
    } else {
        document.getElementById("next-button").style.display = "block";
        document.getElementById("submit-button").style.display = "none";
    }
}

function submitQuiz() {
    clearInterval(timer);
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result-page").style.display = "block";
    document.getElementById("time-spent").innerText = formatTime(600 - timeLeft);
    calculateScore();
    document.getElementById("score").innerText = score;
}

function calculateScore() {
    score = 0;
    questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.answer) {
            score += 2;
        }
    });
}

function checkAnswers() {
    const answersContainer = document.createElement("div");
    answersContainer.id = "answers-container";
    questions.forEach((question, index) => {
        const questionElement = document.createElement("div");
        questionElement.className = "question";
        questionElement.innerHTML = question.question;
        const selectedAnswer = selectedAnswers[index] !== undefined ? question.options[selectedAnswers[index]] : "No answer selected";
        const correctAnswer = question.options[question.answer];
        const answerElement = document.createElement("div");
        answerElement.className = "answer-card";
        answerElement.innerHTML = `<strong>Selected Answer:</strong> ${selectedAnswer} <br> <strong>Correct Answer:</strong> ${correctAnswer}`;
        if (selectedAnswers[index] === question.answer) {
            answerElement.classList.add("correct");
        } else {
            answerElement.classList.add("wrong");
        }
        questionElement.appendChild(answerElement);
        answersContainer.appendChild(questionElement);
    });
    const resultPage = document.getElementById("result-page");
    const existingAnswersContainer = document.getElementById("answers-container");
    if (existingAnswersContainer) {
        resultPage.removeChild(existingAnswersContainer);
    }
    resultPage.appendChild(answersContainer);
}

function tryAgain() {
    location.reload();
}