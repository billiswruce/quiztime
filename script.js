let questions = [
    {
        question: "Vilka är mina favoritfärger?",
        answers: [
            { text: "Orange och Grön", correct: false },
            { text: "Röd, Pastellrosa & Lavendel", correct: true },
            { text: "Svart & Vit", correct: false },
            { text: "Havsblå och Lavendel", correct: false },
        ]
    },

    {
        question: "Vad är det bästa jag vet?",
        answers: [
            { text: "Vara ute i naturen", correct: true },
            { text: "Trängas bland folk", correct: false },
            { text: "Äta sill", correct: false },
            { text: "Städa", correct: false },
        ]
    },

    {
        question: "I vilket land har jag bott tre omgångar?",
        answers: [
            { text: "Danmark", correct: false },
            { text: "Nya Zeeland", correct: false },
            { text: "Japan", correct: true },
            { text: "Vietnam", correct: false },
        ]
    },

    {
        question: "Vad äter jag absolut inte?",
        answers: [
            { text: "Jordgubbstårta", correct: false },
            { text: "Sill", correct: false },
            { text: "Banan", correct: false },
            { text: "Physalis", correct: true },
        ]
    }
];

let questionElement = document.getElementById("question");
let answerButtons = document.getElementById("answer-buttons");
let nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() { //startposition 
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>  {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none"; 
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    let selectedBtn = e.target;
    let isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else { 
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }   
        button.disabled = true; 
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();