// const startBtn = document.querySelector(".startBtn");
// const popupInfo = document.querySelector(".popup-info");

// startBtn.onclick = () => {
//   popupInfo.classList.add("active");
// };
// const exitBtn = document.querySelector(".exit-btn");
// exitBtn.onclick = () => {
//   popupInfo.classList.remove("active");
// };
const startBtn = document.getElementById("start-btn");
const main = document.getElementById("main");
const exitBtn = document.getElementById("exit-btn");
const continueBtn = document.getElementById("continue-btn");
const quiz = document.getElementById("quiz-section");
const popup = document.getElementById("popup");
const resultBox = document.querySelector(".result-box");
const tryAgainBtn = document.querySelector(".tryAgain-btn");
const goHomeBtn = document.querySelector(".goHome-btn");
const home = document.getElementById("home");
// const goHome = document.getElementById("goHome");
const quizSection = document.querySelector(".quiz-section");

continueBtn.addEventListener("click", () => {
  quiz.style.left = 0;
});
continueBtn.addEventListener("click", () => {
  popup.style.display = "none";
  main.style.filter = `blur(${0})`;
});

startBtn.addEventListener("click", () => {
  main.style.filter = `blur(${15}px)`;
});
exitBtn.addEventListener("click", () => {
  main.style.filter = `blur(${0})`;
});

const quizBox = document.querySelector(".quiz-box");

continueBtn.onclick = () => {
  quizBox.classList.add("active");
  showQuestions(0);
  questionCounter(1);
  headerScore();
};

tryAgainBtn.onclick = () => {
  quizBox.classList.add("active");
  nextBtn.classList.remove("active");
  resultBox.classList.remove("active");

  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
  showQuestions(questionCount);
  questionCounter(questionNumb);

  headerScore();
};
goHomeBtn.addEventListener("click", () => {
  quiz.style.display = "none";
  home.style.marginLeft = "1358px";
});
// goHomeBtn.onclick = () => {
//   quizSection.classList.remove("active");
//   nextBtn.classList.remove("active");
//   resultBox.classList.remove("active");
//   questionCount = 0;
//   questionNumb = 1;
//   userScore = 0;
//   showQuestions(questionCount);
//   questionCounter(questionNumb);
// };

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector(".next-btn");

nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    showQuestions(questionCount);

    questionNumb++;
    questionCounter(questionNumb);

    nextBtn.classList.remove("active");
  } else {
    showResultBox();
  }
};
const optionList = document.querySelector(".option-list");
function showQuestions(index) {
  const questionText = document.querySelector(".question-text");
  questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

  let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
   <div class="option"><span>${questions[index].options[1]}</span></div>
   <div class="option"><span>${questions[index].options[2]}</span></div>
   <div class="option"><span>${questions[index].options[3]}</span></div>`;

  optionList.innerHTML = optionTag;

  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = optionList.children.length;
  if (userAnswer == correctAnswer) {
    answer.classList.add("correct");
    userScore += 1;
    headerScore();
  } else {
    answer.classList.add("incorrect");

    // if answer incorrect, auto selected correct answer
    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }
  }

  // if user has selected, disabled all options

  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }

  nextBtn.classList.add("active");
}
function questionCounter(index) {
  const questionTotal = document.querySelector(".question-total");
  questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
  const headerScoreText = document.querySelector(".header-score");
  headerScoreText.textContent = `score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
  quizBox.classList.remove("active");
  resultBox.classList.add("active");

  const scoreText = document.querySelector(".score-text");
  scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

  const circularProgress = document.querySelector(".circular-progress");
  const progressValue = document.querySelector(".progress-value");
  let progressStartValue = -1;
  let progressEndValue = (userScore / questions.length) * 100;
  let speed = 20;

  let progress = setInterval(() => {
    progressStartValue++;
    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(orange ${
      progressStartValue * 3.6
    }deg, rgba(255, 255, 255, 0.1) 0deg)`;
    if (progressStartValue == progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
}

// goHome.addEventListener("click", () => {
//   popup.style.display = "none";
//   quiz.style.display = "none";
// });
