// Используйте объект history для управления историей переходов на веб-странице. Создайте кнопки "Назад" и "Вперед" для перемещения по истории.

const backButton = document.querySelector('.backButton');
const forwardButton = document.querySelector('.forwardButton');

backButton.addEventListener('click', () => {
    window.history.back();
});

forwardButton.addEventListener('click', () => {
    window.history.forward();
});