// Функции для работы с модальным окном таблицы Менделеева
document.addEventListener("DOMContentLoaded", function () {
  const openButton = document.getElementById("openPeriodicTable");
  const closeButton = document.getElementById("closePeriodicTable");
  const modal = document.getElementById("periodicTableModal");

  // Открытие модального окна
  if (openButton) {
    openButton.addEventListener("click", function () {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  // Закрытие модального окна
  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
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
      iframe.src = iframeSrc;
    }
  }

  if (videoCloseButton) {
    videoCloseButton.addEventListener("click", closeVideoModal);
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

// Функции для работы с модальным окном Stories
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing Stories modal...");

  // Инициализация историй
  initStoriesModal();
});

function initStoriesModal() {
  console.log("initStoriesModal called");

  const storiesOpenButton = document.getElementById("openStories");
  const storiesModal = document.getElementById("storiesModal");
  const closeStories = document.getElementById("closeStories");
  const storyPrev = document.getElementById("storyPrev");
  const storyNext = document.getElementById("storyNext");
  const stories = document.querySelectorAll(".story-item");
  const progressBars = document.querySelectorAll(".progress-fill");

  console.log("Elements found:", {
    storiesOpenButton,
    storiesModal,
    closeStories,
    storyPrev,
    storyNext,
    storiesCount: stories.length,
    progressBarsCount: progressBars.length,
  });

  if (!storiesOpenButton) {
    console.error("openStories button not found!");
    return;
  }

  if (!storiesModal) {
    console.error("storiesModal not found!");
    return;
  }

  let currentStory = 0;
  let autoPlayInterval;
  let isAutoPlaying = false;

  // Открытие модального окна историй
  storiesOpenButton.addEventListener("click", function () {
    console.log("Open Stories button clicked");
    storiesModal.classList.add("active");
    document.body.style.overflow = "hidden";
    currentStory = 0;
    showStory(currentStory);
    startAutoPlay();
  });

  // Закрытие модального окна
  function closeStoriesModal() {
    console.log("Closing Stories modal");
    storiesModal.classList.remove("active");
    document.body.style.overflow = "";
    stopAutoPlay();
  }

  if (closeStories) {
    closeStories.addEventListener("click", closeStoriesModal);
  } else {
    console.error("closeStories button not found!");
  }

  // Показать определенную историю
  function showStory(index) {
    console.log("Showing story", index);

    stories.forEach((story, i) => {
      story.classList.remove("active");
      if (i === index) {
        story.classList.add("active");
      }
    });

    progressBars.forEach((bar, i) => {
      bar.classList.remove("active", "viewed");
      if (i < index) {
        bar.classList.add("viewed");
      } else if (i === index) {
        bar.classList.add("active");
      }
    });

    // Обновить состояние кнопок навигации
    if (storyPrev) {
      storyPrev.disabled = index === 0;
    }
    if (storyNext) {
      storyNext.disabled = index === stories.length - 1;
    }

    // Сбросить и перезапустить автоплей
    if (isAutoPlaying) {
      stopAutoPlay();
      startAutoPlay();
    }
  }

  // Переключение историй
  function goToNextStory() {
    if (currentStory < stories.length - 1) {
      currentStory++;
      showStory(currentStory);
    } else {
      closeStoriesModal();
    }
  }

  function goToPrevStory() {
    if (currentStory > 0) {
      currentStory--;
      showStory(currentStory);
    }
  }

  if (storyPrev) {
    storyPrev.addEventListener("click", function () {
      goToPrevStory();
    });
  }

  if (storyNext) {
    storyNext.addEventListener("click", function () {
      goToNextStory();
    });
  }

  // Автоматическое переключение историй
  function startAutoPlay() {
    isAutoPlaying = true;
    console.log("Starting autoplay");
    autoPlayInterval = setInterval(goToNextStory, 7000);
  }

  function stopAutoPlay() {
    isAutoPlaying = false;
    console.log("Stopping autoplay");
    clearInterval(autoPlayInterval);
  }

  // Функция для определения клика по половинам окна
  function handleStoryClick(e) {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const containerWidth = rect.width;

    // Определяем, по какой половине был клик
    if (clickX < containerWidth / 2) {
      // Левая половина - предыдущая история
      goToPrevStory();
    } else {
      // Правая половина - следующая история
      goToNextStory();
    }
  }

  // Добавляем обработчики клика на контейнер историй для переключения по половинам
  const storiesContainer = document.querySelector(".stories-container");
  if (storiesContainer) {
    storiesContainer.addEventListener("click", handleStoryClick);
  }

  // Также добавляем обработчики на само модальное окно
  const storiesContent = document.querySelector(".stories-content");
  if (storiesContent) {
    storiesContent.addEventListener("click", function (e) {
      // Проверяем, не кликнули ли мы на элементы управления (кнопки, прогресс-бар)
      if (
        !e.target.closest(".story-close-btn") &&
        !e.target.closest(".story-progress") &&
        !e.target.closest(".stories-controls")
      ) {
        const container = e.currentTarget;
        const rect = container.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const containerWidth = rect.width;
      }
    });
  }

  // Добавляем индикаторы половин для лучшего UX
  addHalfIndicators();

  // Функция для добавления индикаторов половин (по желанию)
  function addHalfIndicators() {
    // Создаем индикаторы для половин
    const leftIndicator = document.createElement("div");
    leftIndicator.className = "story-half-indicator story-half-left";
    leftIndicator.innerHTML = "◀";

    const rightIndicator = document.createElement("div");
    rightIndicator.className = "story-half-indicator story-half-right";
    rightIndicator.innerHTML = "▶";

    // Добавляем индикаторы в контейнер
    const storiesContent = document.querySelector(".stories-content");
    if (storiesContent) {
      storiesContent.appendChild(leftIndicator);
      storiesContent.appendChild(rightIndicator);
    }
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
        goToPrevStory();
      } else if (e.key === "ArrowRight" || e.key === " ") {
        goToNextStory();
      }
    }
  });

  // Остановка автоплея при наведении
  storiesModal.addEventListener("mouseenter", stopAutoPlay);
  storiesModal.addEventListener("mouseleave", function () {
    if (storiesModal.classList.contains("active")) {
      startAutoPlay();
    }
  });

  // Остановка автоплея при прикосновении на мобильных
  storiesModal.addEventListener("touchstart", stopAutoPlay);
  storiesModal.addEventListener("touchend", function () {
    setTimeout(() => {
      if (storiesModal.classList.contains("active")) {
        startAutoPlay();
      }
    }, 1000);
  });

  console.log("Stories modal initialized successfully");
}
