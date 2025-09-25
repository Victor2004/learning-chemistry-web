// Функция для генерации случайного смещения
function getRandomOffset() {
  return (Math.random() - 0.5) * 60; // Случайное смещение от -30 до +30 пикселей
}

// Функция для применения случайных смещений к урокам
function applyRandomOffsets() {
  const lessonItems = document.querySelectorAll(".lesson-item");
  let previousOffset = 0;

  lessonItems.forEach((item, index) => {
    // Для первого урока смещение минимальное
    if (index === 0) {
      const offset = getRandomOffset() * 0.3;
      item.style.transform = `translateX(${offset}px)`;
      previousOffset = offset;
    } else {
      // Для последующих уроков учитываем смещение предыдущего урока
      let newOffset;
      const maxDeviation = 40; // Максимальное отклонение от предыдущего положения

      do {
        newOffset = previousOffset + (Math.random() - 0.5) * 30;
      } while (Math.abs(newOffset - previousOffset) > maxDeviation);

      // Ограничиваем общее смещение от центра
      // if (Math.abs(newOffset) > 80) {
      //   newOffset = newOffset > 0 ? 80 : -80;
      // }

      item.style.transform = `translateX(${newOffset}px)`;
      previousOffset = newOffset;
    }

    // Плавное появление
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform += " translateY(0)";
    }, index * 150);
  });
}

// Добавляем обработчики событий для кнопок
document.querySelectorAll(".lesson-button").forEach((button) => {
  button.addEventListener("click", function () {
    if (!this.classList.contains("lesson-locked")) {
      const lessonName = this.getAttribute("data-tooltip");
      alert(`Начинаем урок: ${lessonName}`);
    } else {
      alert("Этот урок пока заблокирован! Пройди предыдущие уроки.");
    }
  });
});

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  applyRandomOffsets();
});
