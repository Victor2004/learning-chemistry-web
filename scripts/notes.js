// Функции для работы с модальным окном таблицы Менделеева
document.addEventListener("DOMContentLoaded", function () {
  const openButton = document.getElementById("openPeriodicTable");
  const closeButton = document.getElementById("closePeriodicTable");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modal = document.getElementById("periodicTableModal");

  // Открытие модального окна
  if (openButton) {
    openButton.addEventListener("click", function () {
      modal.classList.add("active");
      document.body.style.overflow = "hidden"; // Блокируем прокрутку страницы
    });
  }

  // Закрытие модального окна
  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = ""; // Разблокируем прокрутку страницы
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  // Закрытие по клику на оверлей
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Закрытие по клавише Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
});

// Функции для работы с модальным окном видео урока
document.addEventListener("DOMContentLoaded", function () {
  const videoOpenButton = document.getElementById("openVideoLesson");
  const videoCloseButton = document.getElementById("closeVideoLesson");
  const videoCloseBtn = document.getElementById("videoCloseBtn");
  const videoNextBtn = document.getElementById("videoNextBtn");
  const videoModal = document.getElementById("videoLessonModal");

  // Открытие модального окна с видео
  if (videoOpenButton) {
    videoOpenButton.addEventListener("click", function () {
      videoModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  // Закрытие модального окна с видео
  function closeVideoModal() {
    videoModal.classList.remove("active");
    document.body.style.overflow = "";

    // Останавливаем видео при закрытии
    const iframe = videoModal.querySelector("iframe");
    if (iframe) {
      const iframeSrc = iframe.src;
      iframe.src = iframeSrc; // Перезагружаем iframe чтобы остановить видео
    }

    const video = videoModal.querySelector("video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }

  if (videoCloseButton) {
    videoCloseButton.addEventListener("click", closeVideoModal);
  }

  if (videoCloseBtn) {
    videoCloseBtn.addEventListener("click", closeVideoModal);
  }

  // Кнопка "Следующее видео" (можно добавить функционал)
  if (videoNextBtn) {
    videoNextBtn.addEventListener("click", function () {
      // Здесь можно добавить логику переключения на следующее видео
      alert("Переход к следующему видео!");
      // closeVideoModal(); // или закрыть текущее и открыть следующее
    });
  }

  // Закрытие по клику на оверлей
  videoModal.addEventListener("click", function (e) {
    if (e.target === videoModal) {
      closeVideoModal();
    }
  });

  // Закрытие по клавише Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && videoModal.classList.contains("active")) {
      closeVideoModal();
    }
  });
});

// Добавьте в конец файла notes.js
document.addEventListener("DOMContentLoaded", function () {
  const storiesOpenButton = document.getElementById("openStories");
  const storiesModal = document.getElementById("storiesModal");

  if (!storiesModal) {
    // Создаем модальное окно для историй, если его нет
    const modalHTML = `
      <div class="modal-overlay" id="storiesModal">
        <div class="modal-container stories-modal" style="max-width: 400px; height: 85vh;">
          <div class="modal-header">
            <h2>История химии</h2>
            <button class="modal-close" id="closeStories">&times;</button>
          </div>
          
          <div class="modal-content stories-content" style="padding: 0; height: calc(100% - 120px);">
            <div class="stories-container">
              <div class="story-item active">
                <img src="https://victor2004.github.io/learning-chemistry-web/media/lessons/lesson1/story1.webp" 
                     alt="История 1" 
                     class="story-image">
                <div class="story-caption">
                  <h3>Алхимия</h3>
                  <p>Древние алхимики искали философский камень</p>
                </div>
              </div>
              
              <div class="story-item">
                <img src="https://victor2004.github.io/learning-chemistry-web/media/lessons/lesson1/story2.webp"
                     alt="История 2" 
                     class="story-image">
                <div class="story-caption">
                  <h3>Первые опыты</h3>
                  <p>Эксперименты Роберта Бойля в 17 веке</p>
                </div>
              </div>
              
              <div class="story-item">
                <img src="https://victor2004.github.io/learning-chemistry-web/media/lessons/lesson1/story3.webp"
                     alt="История 3" 
                     class="story-image">
                <div class="story-caption">
                  <h3>Таблица Менделеева</h3>
                  <p>Создание периодической таблицы в 1869 году</p>
                </div>
              </div>
            </div>
            
            <div class="stories-controls">
              <button class="story-nav story-prev" id="storyPrev">◀</button>
              <div class="story-progress">
                <div class="progress-bar">
                  <div class="progress-fill active"></div>
                  <div class="progress-fill"></div>
                  <div class="progress-fill"></div>
                </div>
              </div>
              <button class="story-nav story-next" id="storyNext">▶</button>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="modal-button" id="closeStoriesBtn">Закрыть</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }

  // Инициализация после создания DOM
  initStoriesModal();
});

function initStoriesModal() {
  const storiesOpenButton = document.getElementById("openStories");
  const storiesModal = document.getElementById("storiesModal");
  const closeStoriesBtn = document.getElementById("closeStoriesBtn");
  const closeStories = document.getElementById("closeStories");
  const storyPrev = document.getElementById("storyPrev");
  const storyNext = document.getElementById("storyNext");
  const stories = document.querySelectorAll(".story-item");
  const progressBars = document.querySelectorAll(".progress-fill");

  let currentStory = 0;

  // Открытие модального окна историй
  if (storiesOpenButton) {
    storiesOpenButton.addEventListener("click", function () {
      storiesModal.classList.add("active");
      document.body.style.overflow = "hidden";
      currentStory = 0;
      showStory(currentStory);
    });
  }

  // Закрытие модального окна
  function closeStoriesModal() {
    storiesModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (closeStoriesBtn) {
    closeStoriesBtn.addEventListener("click", closeStoriesModal);
  }

  if (closeStories) {
    closeStories.addEventListener("click", closeStoriesModal);
  }

  // Показать определенную историю
  function showStory(index) {
    stories.forEach((story, i) => {
      story.classList.toggle("active", i === index);
    });

    progressBars.forEach((bar, i) => {
      bar.classList.toggle("active", i === index);
      bar.classList.toggle("viewed", i < index);
    });
  }

  // Переключение историй
  if (storyPrev) {
    storyPrev.addEventListener("click", function () {
      if (currentStory > 0) {
        currentStory--;
        showStory(currentStory);
      }
    });
  }

  if (storyNext) {
    storyNext.addEventListener("click", function () {
      if (currentStory < stories.length - 1) {
        currentStory++;
        showStory(currentStory);
      }
    });
  }

  // Закрытие по клику на оверлей
  storiesModal.addEventListener("click", function (e) {
    if (e.target === storiesModal) {
      closeStoriesModal();
    }
  });

  // Закрытие по клавише Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && storiesModal.classList.contains("active")) {
      closeStoriesModal();
    }

    // Навигация стрелками
    if (storiesModal.classList.contains("active")) {
      if (e.key === "ArrowLeft") {
        if (currentStory > 0) {
          currentStory--;
          showStory(currentStory);
        }
      } else if (e.key === "ArrowRight") {
        if (currentStory < stories.length - 1) {
          currentStory++;
          showStory(currentStory);
        }
      }
    }
  });

  // Автоматическое переключение историй (опционально)
  let autoPlayInterval;

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      if (currentStory < stories.length - 1) {
        currentStory++;
        showStory(currentStory);
      } else {
        clearInterval(autoPlayInterval);
      }
    }, 5000); // 5 секунд на каждую историю
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Запускаем автоплей при открытии
  storiesModal.addEventListener("modalOpen", startAutoPlay);
  storiesModal.addEventListener("modalClose", stopAutoPlay);
}
