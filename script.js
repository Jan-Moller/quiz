let currentQuestion = 0;
let correctAnswers = 0;


function init() {
    renderQuestionAmount();
    showCurrentQuestion();
    resetAnswerButtons();
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
    renderProgressBar();
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
    let audio_wrong = new Audio('assets/sounds/wrong.mp3');
    let audio_success = new Audio('assets/sounds/success.mp3');

    if (selectedAnswer == correctAnswer) {
        correctAnswers++
        document.getElementById(correctAnswer).parentNode.classList.add('bg-success');
        audio_success.play()

    }
    else {
        document.getElementById(selectedAnswer).parentNode.classList.add('bg-danger')
        document.getElementById(correctAnswer).parentNode.classList.add('bg-success');
        audio_wrong.play()
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
        renderProgressBar();
    }
    else { showResultScreen(); }
}


function resetAnswerButtons() {
    for (let i = 0; i < 4; i++) {
        let answerRef = document.getElementById(`answer_${i + 1}`);
        if (answerRef.parentNode.classList.contains('bg-danger') || answerRef.parentNode.classList.contains('bg-success')) { answerRef.parentNode.classList.remove('bg-danger') || answerRef.parentNode.classList.remove('bg-success') }
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
    document.getElementById('quiz_img').src = 'assets/img/trophy.png';
    let correctAnswersRef = document.getElementById('correct_answers');
    let totalQuestionsRef = document.getElementById('total_questions');
    correctAnswersRef.innerHTML = correctAnswers;
    totalQuestionsRef.innerHTML = currentQuestion;
}

function renderProgressBar() {
    let progressbarRef = document.getElementById('progress');
    let currentProgress = (currentQuestion + 1) / questions.length;
    progressbarRef.style.width = (currentProgress * 100) + '%';
    progressbarRef.innerHTML = Math.round((currentProgress * 100)) + '%';
}

function nextGame() {
    currentQuestion = 0;
    correctAnswers = 0;
    document.getElementById('question_section').classList.remove('d-none');
    document.getElementById('result_section').classList.add('d-none');
    document.getElementById('quiz_img').src = 'assets/img/brainbg.jpg';
    setNextQuestionNumber(); 
    init();

}
