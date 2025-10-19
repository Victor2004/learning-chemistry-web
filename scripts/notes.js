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
