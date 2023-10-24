// Подтверждение закрытия страницы:
// Создайте всплывающее окно или диалоговое окно, которое появляется при попытке закрыть вкладку браузера и спрашивает
// пользователя, уверен ли он в своем решении закрыть страницу.

const btnBack = document.querySelector('#btnBack');
const btnForward = document.querySelector('#btnForward');

btnBack.addEventListener('click', () => {
  history.back();
})

btnForward.addEventListener('click', () => {
  history.forward()
})
