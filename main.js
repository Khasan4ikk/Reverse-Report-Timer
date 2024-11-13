// Получаем ссылки на элементы HTML
const timerDisplay = document.getElementById('timer'); // Элемент для отображения таймера
const start5 = document.querySelector('#start5'); // Кнопка "5 минут"
const start15 = document.querySelector('#start15'); // Кнопка "15 минут"
const start30 = document.querySelector('#start30'); // Кнопка "30 минут"
const start60 = document.querySelector('#start60'); // Кнопка "1 час"

const pauseButton = document.getElementById('pause'); // Кнопка "Пауза"
const resetButton = document.getElementById('reset'); // Кнопка "Сброс"

let intervalId; // Хранит ID интервала, который создается при запуске таймера
let timeRemaining; // Хранит количество секунд, оставшихся до окончания таймера
let isPaused = false; // Флаг, указывающий, находится ли таймер в состоянии паузы
let isRunning = false; // Флаг, указывающий, запущен ли таймер

// Функция для обновления отображения таймера
function updateTimerDisplay() {
 const minutes = Math.floor(timeRemaining / 60); // Вычисляем минуты
 const seconds = timeRemaining % 60; // Вычисляем секунды
 const formattedTime = `${pad(minutes)}:${pad(seconds)}`; // Форматируем время в виде "MM:SS"
 timerDisplay.textContent = formattedTime; // Обновляем текст элемента с таймером
}

// Функция для добавления ведущего нуля
function pad(num) {
 return num.toString().padStart(2, '0'); // Добавляем ведущий ноль к однозначным числам (например, "5" -> "05")
}

// Функция для запуска таймера
function startTimer(duration) {
 clearInterval(intervalId); // Останавливаем предыдущий интервал, если он был запущен
 timeRemaining = duration; // Устанавливаем начальное время
 isPaused = false; // Сбрасываем флаг паузы
 isRunning = true; // Устанавливаем флаг, что таймер запущен
 updateTimerDisplay(); // Обновляем отображение таймера

 intervalId = setInterval(() => { // Запускаем интервал (выполняется каждые 1000 мс)
  if (timeRemaining > 0 && !isPaused) { // Если время есть и таймер не на паузе
   timeRemaining--; // Уменьшаем оставшееся время
   updateTimerDisplay(); // Обновляем отображение таймера
  } else {
   clearInterval(intervalId); // Останавливаем интервал, когда время закончилось
   timerDisplay.textContent = 'Время вышло!'; // Выводим сообщение
   isRunning = false; // Таймер остановлен
  }
 }, 1000);
}

// Функция для паузы/продолжения таймера
function pauseTimer() {
 if (isPaused) { // Если таймер на паузе
  // Продолжить таймер
  isPaused = false; // Сбрасываем флаг паузы
  pauseButton.textContent = 'Пауза'; // Изменяем текст кнопки на "Пауза"
  intervalId = setInterval(() => { // Запускаем интервал
   if (timeRemaining > 0) { // Если время есть
    timeRemaining--; // Уменьшаем время
    updateTimerDisplay(); // Обновляем отображение
   } else {
    clearInterval(intervalId); // Останавливаем интервал
    timerDisplay.textContent = 'Время вышло!'; // Выводим сообщение
    isRunning = false; // Таймер остановлен
   }
  }, 1000);
 } else {
  // Поставить таймер на паузу
  isPaused = true; // Устанавливаем флаг паузы
  clearInterval(intervalId); // Останавливаем интервал
  pauseButton.textContent = 'Продолжить'; // Изменяем текст кнопки на "Продолжить"
 }
}

// Функция для сброса таймера
function resetTimer() {
 clearInterval(intervalId); // Останавливаем интервал
 timeRemaining = 0; // Сбрасываем оставшееся время
 updateTimerDisplay(); // Обновляем отображение таймера
 isPaused = false; // Сбрасываем флаг паузы
 isRunning = false; // Сбрасываем флаг, что таймер запущен
 pauseButton.textContent = 'Пауза'; // Возвращаем текст кнопки в исходное состояние
 pauseButton.disabled = true; // Блокируем кнопку "Пауза"
}

// Обработчики событий для кнопок
start5.addEventListener('click', () => startTimer(5 * 60)); // Запуск таймера на 5 минут
start15.addEventListener('click', () => startTimer(15 * 60)); // Запуск таймера на 15 минут
start30.addEventListener('click', () => startTimer(30 * 60)); // Запуск таймера на 30 минут
start60.addEventListener('click', () => startTimer(60 * 60)); // Запуск таймера на 1 час
pauseButton.addEventListener('click', pauseTimer); // Обработка клика на кнопку "Пауза"
resetButton.addEventListener('click', resetTimer); // Обработка клика на кнопку "Сброс"

// Разблокировка кнопки "Пауза" при запуске нового таймера
start5.addEventListener('click', () => pauseButton.disabled = false);
start15.addEventListener('click', () => pauseButton.disabled = false);
start30.addEventListener('click', () => pauseButton.disabled = false);
start60.addEventListener('click', () => pauseButton.disabled = false);

// Изначально блокируем кнопку "Пауза"
pauseButton.disabled = true;
