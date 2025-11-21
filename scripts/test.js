// Глобальные переменные для теста
let currentTest = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let testCompleted = false;

// Загрузка теста из JSON
async function loadTest(testId) {
  try {
    const response = await fetch("data/tests.json");
    const data = await response.json();

    // Находим нужный тест
    currentTest = data.tests.find((test) => test.id === testId);

    if (!currentTest) {
      throw new Error(`Тест с ID "${testId}" не найден`);
    }

    // Обновляем заголовки страницы
    document.title = currentTest.title;

    // Инициализируем массив ответов
    userAnswers = Array(currentTest.questions.length).fill(null);

    // Отображаем тест
    displayTest();
  } catch (error) {
    console.error("Ошибка загрузки теста:", error);
    document.getElementById("testContent").innerHTML = `
      <div class="loading-container">
        <p>Ошибка загрузки теста: ${error.message}</p>
        <button class="test-button" onclick="location.reload()">Попробовать снова</button>
      </div>
    `;
  }
}

// Отображение теста
function displayTest() {
  const testContent = document.getElementById("testContent");

  testContent.innerHTML = `
    <div class="test-header">
      <h2 class="test-title">${currentTest.title}</h2>
      <div class="test-progress" id="testProgress">Вопрос 1 из ${currentTest.questions.length}</div>
    </div>

    <div id="questionArea">
      <!-- Здесь будет отображаться текущий вопрос -->
    </div>

    <div class="test-controls">
      <button id="prevButton" class="test-button" disabled>Назад</button>
      <button id="nextButton" class="test-button">Далее</button>
    </div>
  `;

  // Отображаем первый вопрос
  displayQuestion(currentQuestionIndex);

  // Назначаем обработчики событий
  setupEventListeners();
}

// Отображение текущего вопроса
function displayQuestion(index) {
  const question = currentTest.questions[index];
  const questionArea = document.getElementById("questionArea");
  const testProgress = document.getElementById("testProgress");

  testProgress.textContent = `Вопрос ${index + 1} из ${
    currentTest.questions.length
  }`;

  let questionHTML = "";

  // Добавляем текст вопроса
  if (question.type === "text_with_gap") {
    const questionWithGap = question.text.replace(
      "______",
      `<span class="blank-word">______</span>`
    );
    questionHTML += `<div class="question-text">${questionWithGap}</div>`;
  } else {
    questionHTML += `<div class="question-text">${question.text}</div>`;
  }

  // Добавляем изображение, если есть
  if (question.image) {
    questionHTML += `<img src="${question.image}" class="question-image" alt="Иллюстрация к вопросу">`;
  }

  // Добавляем варианты ответов
  let answersClass = "answers-container";
  if (question.type === "image_choice") {
    answersClass += " image-answers";
  }

  questionHTML += `<div class="${answersClass}" id="answersContainer">`;

  question.answers.forEach((answer, i) => {
    if (question.type === "image_choice") {
      questionHTML += `
        <div class="answer-option image-answer ${
          userAnswers[index] === i ? "selected" : ""
        }" data-index="${i}">
          <img src="${answer.image}" alt="${
        answer.text
      }" onerror="this.src='https://victor2004.github.io/learning-chemistry-web/media/underConstruction.png'">
          <div>${answer.text}</div>
        </div>
      `;
    } else {
      questionHTML += `
        <div class="answer-option ${
          userAnswers[index] === i ? "selected" : ""
        }" data-index="${i}">
          ${answer}
        </div>
      `;
    }
  });

  questionHTML += `</div>`;

  // Добавляем поле для обратной связи
  questionHTML += `<div class="feedback-container" id="feedbackContainer"></div>`;

  questionArea.innerHTML = questionHTML;

  // Добавляем обработчики событий для вариантов ответов
  const answerOptions = document.querySelectorAll(".answer-option");
  answerOptions.forEach((option) => {
    option.addEventListener("click", function () {
      if (testCompleted) return;

      // Снимаем выделение со всех вариантов
      answerOptions.forEach((opt) => opt.classList.remove("selected"));
      // Выделяем выбранный вариант
      this.classList.add("selected");

      // Сохраняем ответ пользователя
      userAnswers[currentQuestionIndex] = parseInt(
        this.getAttribute("data-index")
      );

      // Активируем кнопку "Далее"
      document.getElementById("nextButton").disabled = false;
    });
  });

  // Обновляем состояние кнопок навигации
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  prevButton.disabled = index === 0;

  // Если это последний вопрос, меняем текст кнопки
  if (index === currentTest.questions.length - 1) {
    nextButton.textContent = "Завершить тест";
  } else {
    nextButton.textContent = "Далее";
  }

  // Если ответ уже выбран, активируем кнопку "Далее"
  nextButton.disabled = userAnswers[index] === null;
}

// Настройка обработчиков событий
function setupEventListeners() {
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  prevButton.addEventListener("click", function () {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      displayQuestion(currentQuestionIndex);
    }
  });

  nextButton.addEventListener("click", function () {
    if (currentQuestionIndex < currentTest.questions.length - 1) {
      currentQuestionIndex++;
      displayQuestion(currentQuestionIndex);
    } else {
      // Если это последний вопрос, завершаем тест
      showResults();
    }
  });
}

// Показать результаты теста
function showResults() {
  const correctAnswers = userAnswers.reduce((count, answer, index) => {
    return (
      count + (answer === currentTest.questions[index].correctAnswer ? 1 : 0)
    );
  }, 0);

  const score = Math.round(
    (correctAnswers / currentTest.questions.length) * 100
  );

  let message = "";
  if (score >= 90) {
    message = "Отлично! Вы отлично усвоили материал!";
  } else if (score >= 70) {
    message = "Хорошо! Вы хорошо разбираетесь в теме.";
  } else if (score >= 50) {
    message = "Удовлетворительно. Рекомендуется повторить материал.";
  } else {
    message = "Попробуйте еще раз после повторения материала.";
  }

  const questionArea = document.getElementById("questionArea");
  questionArea.innerHTML = `
    <div class="results-container">
      <h2 class="results-title">Тест завершен!</h2>
      <div class="results-score">${score}%</div>
      <div class="results-message">
        Вы ответили правильно на ${correctAnswers} из ${currentTest.questions.length} вопросов.
      </div>
      <div class="results-message">${message}</div>
      <button id="restartButton" class="test-button">Пройти тест еще раз</button>
    </div>
  `;

  // Добавляем обработчик для кнопки перезапуска
  document
    .getElementById("restartButton")
    .addEventListener("click", function () {
      location.reload();
    });

  // Скрываем кнопки навигации
  document.querySelector(".test-controls").style.display = "none";

  testCompleted = true;
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  // Получаем ID теста из хэша URL (например, /test.html#1)
  function getTestIdFromHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith("#")) {
      return hash.substring(1); // Убираем символ # и возвращаем ID
    }
    return "0"; // Значение по умолчанию, если хэш отсутствует
  }

  // Загружаем тест с ID из хэша URL
  const testId = getTestIdFromHash();
  loadTest(testId);

  // Код для открытия/закрытия таблицы Менделеева
  const periodicTableModal = document.getElementById("periodicTableModal");
  const openPeriodicTable = document.getElementById("openPeriodicTable");
  const closePeriodicTable = document.getElementById("closePeriodicTable");
  const closeModalBtn = document.getElementById("closeModalBtn");

  if (openPeriodicTable) {
    openPeriodicTable.addEventListener("click", function () {
      periodicTableModal.classList.add("active");
    });
  }

  if (closePeriodicTable) {
    closePeriodicTable.addEventListener("click", function () {
      periodicTableModal.classList.remove("active");
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", function () {
      periodicTableModal.classList.remove("active");
    });
  }

  // Закрытие модального окна при клике вне его
  periodicTableModal.addEventListener("click", function (e) {
    if (e.target === periodicTableModal) {
      periodicTableModal.classList.remove("active");
    }
  });
});
