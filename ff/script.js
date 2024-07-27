document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const cont = document.getElementById("cont");
  const countdownElement = document.getElementById('countdown');
  const questionElement = document.getElementById('question');
  const optionsContainer = document.getElementById('optionsContainer');
  const quizSection = document.querySelector('.quiz_box section');
  const nextBtn = document.getElementById('next_btn');
  const previousBtn = document.getElementById('previous_btn');
  const submitExam = document.getElementById('submit_btn');
  const questionNumElement = document.getElementById('question_num');
  const totalQuestionElement = document.getElementById('total_question');
  const quizBox = document.querySelector('.quiz_box');
  const resultBox = document.querySelector('.result_box');
  const resultElement = document.getElementById('result');

  let countdownInterval;
  let currentQuestion = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;

  const questions = [
    {
      question: "What does HTML stand for?",
      options: [
        "Hype Text Preprocessor",
        "Hype Text Markup Language",
        "Hyper Text Multiple Language",
        "Hyper Tool Multi Language"
      ],
      correctAnswer: 1
    },
    {
      question: "What does JS stand for?",
      options: [
        "Hype JS Preprocessor",
        "Hype Text Python Language",
        "Hyper Text Test Language",
        "Hyper Tool Multi Language"
      ],
      correctAnswer: 0
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Common Style Sheet",
        "Colorful Style Sheet",
        "Computer Style Sheet",
        "Cascading Style Sheet"
      ],
      correctAnswer: 3
    }
  ];

  startBtn.addEventListener("click", function () {
    document.querySelector('.start_btn').style.display = 'none';
    document.querySelector('.info_box').style.display = 'block';
  });

  cont.addEventListener('click', function () {
    document.querySelector(".info_box").style.display = 'none';
    quizBox.style.display = 'block';
    startCountdown(90 * 60);
  });

  function startCountdown(duration) {
    let timeRemaining = duration;
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }
    countdownInterval = setInterval(() => {
      let minutes = Math.floor(timeRemaining / 60);
      let seconds = timeRemaining % 60;
      countdownElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
      timeRemaining--;

      if (timeRemaining < 0) {
        clearInterval(countdownInterval);
        countdownElement.textContent = 'Finish';
      }
    }, 1000);
  }

  function showQuestion() {
    quizSection.classList.add('hidden');

    setTimeout(() => {
      questionElement.innerText = questions[currentQuestion].question;
      optionsContainer.innerHTML = '';

      questions[currentQuestion].options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.innerHTML = `<span>${option}</span>`;
        optionsContainer.appendChild(optionDiv);

        optionDiv.addEventListener('click', () => {
          if (index === questions[currentQuestion].correctAnswer) {
            optionDiv.classList.add('correct');
            correctAnswers++;
          } else {
            optionDiv.classList.add('incorrect');
            incorrectAnswers++;
          }
          optionsContainer.querySelectorAll('.option').forEach(opt => opt.style.pointerEvents = 'none');
        });
      });

      quizSection.classList.remove('hidden');
    }, 300);
  }

  nextBtn.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion();
      previousBtn.style.display = 'block';
      updateQuestionNumber();
    } else {
      nextBtn.style.display = "none";
      submitExam.style.display = "block";
      previousBtn.style.display = "block";
    }
  });

  previousBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion();
      updateQuestionNumber();
      nextBtn.style.display = "block";
      submitExam.style.display = "none";
    }
  });

  submitExam.addEventListener('click', function () {
    quizBox.style.display = "none";
    resultBox.style.display = "block";
    resultElement.innerHTML = `Correct Answers: ${correctAnswers}<br>Incorrect Answers: ${incorrectAnswers}`;
  });

  totalQuestionElement.textContent = questions.length;

  function updateQuestionNumber() {
    questionNumElement.textContent = currentQuestion + 1;
  }

  showQuestion();
});
