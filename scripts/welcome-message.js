// Приветственное сообщение с хомяком
class WelcomeMessage {
  constructor() {
    this.currentMessageIndex = 0;
    this.messages = [
      "Привет! Меня зовут Химяк, и я здесь, чтобы превратить изучение химии в захватывающее приключение!",
      "Ты думаешь химия сложная? Я докажу обратное! Мы сделали её невероятно интересной и лёгкой для понимания.",
      "Давай познакомимся ближе! Это твоя карта путешествий по миру элементов и реакций. Каждый урок — новый этап пути к успеху. Уроки состоят из понятных конспектов и занимательных видеоуроков (скоро!), а также тестов, которые проверят твои знания.",
      "Один урок вместе с контролем займет всего лишь пару минут твоего времени. Просто представь себе, насколько быстро ты сможешь овладеть всеми секретами науки!",
      "Если ты хочешь двигаться дальше, сначала завершишь текущий урок и успешно сдай контроль. Если не получилось, ничего страшного — мы поможем тебе преодолеть любые трудности!",
      'А вдруг тебе хочется повторить какую-нибудь тему отдельно? Нет проблем! Изменяй режим в настройках на "не с нуля" и погружайся в нужные разделы.',
      "Хочешь подготовиться к экзаменам уровня ОГЭ или ЕГЭ и почувствовать себя уверенно перед ними? Регистрируйся прямо сейчас и открой доступ к специальным материалам, разработанным именно для тебя!",
      "Готов отправиться в путешествие навстречу удивительным открытиям? Начнём вместе!",
    ];

    this.modal = document.getElementById("welcomeModal");
    this.bubbleText = document.getElementById("bubbleText");
    this.progressDots = document.querySelectorAll(".progress-dot");

    this.init();
  }

  init() {
    // Проверяем, показывали ли уже приветствие
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");

    if (!hasSeenWelcome) {
      this.showWelcome();
      this.setupEventListeners();
    }
  }

  showWelcome() {
    setTimeout(() => {
      this.modal.classList.add("active");
      this.updateMessage();
    }, 1000);
  }

  updateMessage() {
    // Обновляем текст в облачке
    this.bubbleText.textContent = this.messages[this.currentMessageIndex];

    // Обновляем индикатор прогресса
    this.progressDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentMessageIndex);
    });

    // Добавляем анимацию появления текста
    this.bubbleText.style.animation = "none";
    setTimeout(() => {
      this.bubbleText.style.animation = "textAppear 0.5s ease-out";
    }, 10);
  }

  nextMessage() {
    this.currentMessageIndex++;

    if (this.currentMessageIndex < this.messages.length) {
      this.updateMessage();
    } else {
      this.closeWelcome();
    }
  }

  closeWelcome() {
    this.modal.classList.remove("active");
    localStorage.setItem("hasSeenWelcome", "true");

    // Можно добавить callback при закрытии
    setTimeout(() => {
      if (typeof this.onClose === "function") {
        this.onClose();
      }
    }, 500);
  }

  goToMessage(index) {
    if (index >= 0 && index < this.messages.length) {
      this.currentMessageIndex = index;
      this.updateMessage();
    }
  }

  setupEventListeners() {
    // Клик в любом месте для перехода к следующему сообщению
    this.modal.addEventListener("click", (e) => {
      // Не переключаем сообщение при клике на точки прогресса
      if (!e.target.classList.contains("progress-dot")) {
        this.nextMessage();
      }
    });

    // Клик на точки прогресса для перехода к конкретному сообщению
    this.progressDots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        e.stopPropagation(); // Останавливаем всплытие чтобы не сработал общий клик
        const index = parseInt(dot.getAttribute("data-index"));
        this.goToMessage(index);
      });
    });

    // Закрытие по клавише Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("active")) {
        this.closeWelcome();
      }
    });
  }

  // Метод для сброса и повторного показа (для тестирования)
  reset() {
    localStorage.removeItem("hasSeenWelcome");
    this.currentMessageIndex = 0;
    this.showWelcome();
  }

  // Callback при закрытии
  onClose() {
    console.log("Приветственное сообщение закрыто");
    // Здесь можно добавить дополнительные действия после закрытия
  }
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  const welcomeMessage = new WelcomeMessage();

  // Для тестирования: раскомментируйте строку ниже чтобы сбросить и показать снова
  // welcomeMessage.reset();
});
