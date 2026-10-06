const questions = [
    {
        question: "What does a large language model predict?",
        options: [
            "The next token",
            "The next webpage",
            "The final program",
            "The user's identity"
        ],
        answer: 0,
        feedback:
            "An LLM generates text by predicting the next token from the context."
    },

    {
        question: "What comes before the colon in the course commit format?",
        options: [
            "The type, such as feat or fix",
            "The branch name",
            "The commit hash",
            "The file extension"
        ],
        answer: 0,
        feedback:
            "The commit type, such as feat or fix, comes before the colon."
    },

    {
        question: "What must a unit test do before the bug is fixed?",
        options: [
            "Pass",
            "Fail",
            "Be deleted",
            "Be skipped"
        ],
        answer: 1,
        feedback:
            "A specification-driven test should fail before the bug is fixed and pass after the fix."
    },

    {
        question: "Where should webpage styling live?",
        options: [
            "In a separate CSS file",
            "Only inside JavaScript",
            "Inside the database",
            "In the image file"
        ],
        answer: 0,
        feedback:
            "Separating CSS from HTML keeps the webpage structure and appearance independent."
    },

    {
        question: "What does a loop inside another loop usually mean?",
        options: [
            "Quadratic time",
            "Constant time",
            "No execution",
            "Linear time only"
        ],
        answer: 0,
        feedback:
            "Two nested loops that each run proportional to n usually result in O(n²) time."
    }
];


let currentQuestion = 0;
let score = 0;
let answered = false;


const questionNumber = document.getElementById("questionNumber");
const scoreDisplay = document.getElementById("scoreDisplay");
const progressBar = document.getElementById("progressBar");

const question = document.getElementById("question");
const answers = document.getElementById("answers");
const feedback = document.getElementById("feedback");

const nextButton = document.getElementById("nextButton");

const quizContent = document.getElementById("quizContent");
const result = document.getElementById("result");

const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");
const restartButton = document.getElementById("restartButton");


function showQuestion() {

    answered = false;

    const item = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreDisplay.textContent =
        `Score: ${score}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    question.textContent = item.question;

    answers.innerHTML = "";

    feedback.textContent = "";

    feedback.className = "";

    nextButton.disabled = true;


    item.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.className = "quiz-answer";

        button.innerHTML =
            `<span>${String.fromCharCode(65 + index)}</span>${option}`;

        button.addEventListener("click", () => {
            selectAnswer(index, button);
        });

        answers.appendChild(button);
    });
}


function selectAnswer(index, selectedButton) {

    if (answered) {
        return;
    }

    answered = true;

    const item = questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".quiz-answer");

    buttons.forEach(button => {
        button.disabled = true;
    });


    if (index === item.answer) {

        score++;

        selectedButton.classList.add("correct");

        feedback.textContent = item.feedback;

    } else {

        selectedButton.classList.add("wrong");

        buttons[item.answer].classList.add("correct");

        feedback.textContent = item.feedback;
    }


    scoreDisplay.textContent =
        `Score: ${score}`;

    feedback.className = "show";

    nextButton.disabled = false;
}


function nextQuestion() {

    if (!answered) {
        return;
    }

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        showResult();
    }
}


function showResult() {

    quizContent.style.display = "none";

    result.classList.add("show");

    finalScore.textContent =
        `${score} / ${questions.length}`;


    if (score === 5) {

        resultMessage.textContent =
            "Perfect score. Excellent work!";

    } else if (score >= 3) {

        resultMessage.textContent =
            "Good job. Keep practicing!";

    } else {

        resultMessage.textContent =
            "Review the concepts and try again.";
    }
}


function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    quizContent.style.display = "";

    result.classList.remove("show");

    showQuestion();
}


nextButton.addEventListener("click", nextQuestion);

restartButton.addEventListener("click", restartQuiz);


showQuestion();