// Определение текущего размера окна браузера: напишите функцию, которая будет выводить текущую ширину и высоту окна браузера при его изменении.

function logWindowSize () {
    console.log(`Ширина: ${document.documentElement.clientWidth}, Высота: ${document.documentElement.clientHeight}`);
    }
addEventListener('resize', () => {
    logWindowSize();
})