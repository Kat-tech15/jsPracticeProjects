const quizData = [
    {
        question: "What is the capital city of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },

    {
        question: "Which language runs in a web  browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "What CSS stand for?",
        options: ["Central Style Sheet","Cascading Style Sheets", "Cascading Simple Sheets", "Cars Suvs Sailboats"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "What year as JavaScript launched?",
        options: ["1996", "1994","1995","None of the above"],
        answer: "1995"
    }
];

let currentQuestionIndex = 0;
let score = 0 ;
let selectedOption = null;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");


function loadQuestion(){
    nextBtn.disabled = true;
    selectedOption = null;

    const currentQ = quizData[currentQuestionIndex];
    questionEl.textContent = currentQ.question;

    optionsEl.innerHTML = "";

    currentQ.options.forEach(option =>{
        const li = document.createElement("li");
        li.textContent = option;

        li.addEventListener("click", () => {
            if (selectedOption) {
                selectedOption.classList.remove("selected");
            }
            li.classList.add("selected");
            selectedOption = li;
            nextBtn.disabled = false;
        });

        optionsEl.appendChild(li);
    });
}

function nextQuestion(){
    if (!selectedOption) return;

    const currentQ = quizData[currentQuestionIndex];
    if (selectedOption.textContent == currentQ.answer) {
        score++;
    }
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionEl.style.display = "none";
    optionsEl.style.display ="none";
    nextBtn.style.display ="none";

    resultEl.style.display = "block";

    const total = quizData.length;
    const passed = score >= total / 2 ;

    if (passed){
        score.innerHTML = `<strong>${score} / ${total}</strong><br>🎉 Congratulations ,You ${passed} the quiz!👏`;
    } else{
        score.innerHTML = `<strong>${score} / ${total}</strong><br>😢 You failed the quiz. Please try again.`;
    }
    scoreEl.textContent = `${score} / ${quizData.length}`;

    const scoreSpan = document.getElementById("score");

    if (passed) {
        scoreSpan.classList.remove("fail");
        scoreSpan.innerHTML = `<strong>${score} / ${total}</strong><br>🎉 Congratulations, You passed the quiz! 👏`;
    } else {
        scoreSpan.classList.add("fail");
        scoreSpan.innerHTML = `<strong>${score} / ${total}</strong><br>😢 You failed the quiz. Please try again.`;
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    questionEl.style.display = "block";
    optionsEl.style.display = "block";
    nextBtn.style.display = "inline-block";
    resultEl.style.display = "none";

    loadQuestion();
}

loadQuestion();


 