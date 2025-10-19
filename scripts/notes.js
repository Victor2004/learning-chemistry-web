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
