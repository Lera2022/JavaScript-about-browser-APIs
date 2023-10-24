// Определение текущего размера окна браузера:
// Напишите функцию, которая будет выводить текущую ширину и высоту окна браузера при его изменении.
const widthHolder = document.querySelector('#currentWidth');
document.addEventListener('DOMContentLoaded', () => {
  widthHolder.innerHTML = document.documentElement.clientWidth;
})
window.addEventListener('resize', () => {
  widthHolder.innerHTML = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
  );
})
