let currentQuestion = 0;


function init() {
    renderQuestionAmount();
    showCurrentQuestion();
}


function renderQuestionAmount() {
    let maxAmountRef = document.getElementById('max_amount_questions');
    let questionsAmount = questions.length;

    maxAmountRef.innerHTML = '';
    maxAmountRef.innerHTML = questionsAmount;

}


function showCurrentQuestion() {
    let questionRef = document.getElementById('current_question');
    let question = questions[currentQuestion].question

    questionRef.innerHTML = '';
    questionRef.innerHTML = question;
    renderAnswerOptions();
}


function renderAnswerOptions() {
    for (let i = 0; i < 4; i++) {
        let answerRef = document.getElementById(`answer_${i + 1}`);
        answerRef.innerHTML = questions[currentQuestion][`answer_${i + 1}`]
    }
}


function checkAnswer(selectedAnswer) {
    let correctAnswer = `answer_${questions[currentQuestion].right_answer}`;
    let nextBtn = document.getElementById('next_btn')

    if (selectedAnswer == correctAnswer) {
        document.getElementById(correctAnswer).parentNode.classList.add('bg-success')
    }
    else {
        document.getElementById(selectedAnswer).parentNode.classList.add('bg-danger')
        document.getElementById(correctAnswer).parentNode.classList.add('bg-success');
    }
    nextBtn.disabled = false;
}


function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        let nextBtn = document.getElementById('next_btn');
        showCurrentQuestion();
        resetAnswerButtons()
        setNextQuestionNumber()
        nextBtn.disabled = true;
    }
    else { showResultScreen(); }
}


function resetAnswerButtons() {
    for (let i = 0; i < 4; i++) {
        let answerRef = document.getElementById(`answer_${i + 1}`);
        if (answerRef.parentNode.classList.contains('bg-danger') || answerRef.parentNode.classList.contains('bg-success')) 
            { answerRef.parentNode.classList.remove('bg-danger') || answerRef.parentNode.classList.remove('bg-success') }
    }
}


function setNextQuestionNumber() {
    let currentAmountRef = document.getElementById('current_question_amount');
    currentAmountRef.innerHTML = '';
    currentAmountRef.innerHTML = currentQuestion + 1;
}

function showResultScreen() {
    document.getElementById('question_section').classList.add('d-none');
    document.getElementById('result_section').classList.remove('d-none');
}
