// Quiz State
let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const startBtn = document.querySelector('.start-btn');
const returnBtn = document.querySelector('.return-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const nextBtn = document.querySelector('.next-btn');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const optionList = document.querySelector('.option-list');

// Start Exam
startBtn.onclick = () => {
  document.querySelector('.cover-page').classList.add('hide');
  quizSection.classList.add('active');
  quizBox.classList.add('active');
  showQuestions(questionCount);
  questionCounter(questionNumb);
};

// Return Button
if (returnBtn) {
  returnBtn.onclick = () => {
    window.location.href = '#';
  };
}

// Next Question
nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    questionNumb++;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    nextBtn.classList.remove('active');
  } else {
    showResultBox();
  }
};

// Show Questions
function showQuestions(index) {
  const questionText = document.querySelector('.question-text');
  const questionImageContainer = document.querySelector('.question-image');

  questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;
  if (questions[index].image) {
    questionImageContainer.innerHTML = `<img src="${questions[index].image}" alt="question image" />`;
  } else {
    questionImageContainer.innerHTML = '';
  }

  const options = questions[index].options
    .map(opt => `<div class="option"><span>${opt}</span></div>`) 
    .join('');

  optionList.innerHTML = options;

  const option = document.querySelectorAll('.option');
  option.forEach(opt => {
    opt.onclick = () => optionSelected(opt);
  });
}

// User selects an option
function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;

  answer.classList.add('selected');
  if (userAnswer === correctAnswer) {
    userScore++;
  }

  let allOptions = optionList.children.length;
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add('disabled');
  }

  nextBtn.classList.add('active');
}

// Show Question Number
function questionCounter(index) {
  const questionTotal = document.querySelector('.question-total');
  questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

// Show Final Score
function showResultBox() {
  quizBox.classList.remove('active');
  resultBox.classList.add('active');

  const scoreText = document.querySelector('.score-text');
  scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

  const circularProgress = document.querySelector('.circular-progress');
  const progressValue = document.querySelector('.progress-value');
  let progressStartValue = 0;
  let progressEndValue = Math.round((userScore / questions.length) * 100);
  let speed = 20;

  let progress = setInterval(() => {
    progressStartValue++;
    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(#AA2C86 ${progressStartValue * 3.6}deg, #eee 0deg)`;
    if (progressStartValue >= progressEndValue) clearInterval(progress);
  }, speed);
}

// Try Again
tryAgainBtn.onclick = () => {
  resultBox.classList.remove('active');
  quizBox.classList.add('active');
  nextBtn.classList.remove('active');

  questionCount = 0;
  questionNumb = 1;
  userScore = 0;

  showQuestions(questionCount);
  questionCounter(questionNumb);
};

goHomeBtn.onclick = () => {
  resultBox.classList.remove('active');
  document.querySelector('.cover-page').classList.remove('hide');
  quizSection.classList.remove('active');

  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
}
