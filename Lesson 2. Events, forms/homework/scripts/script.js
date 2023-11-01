const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const firstButton = document.querySelector('.first-button')
const secondButton = document.querySelector('.second-button')
const thirdButton = document.querySelector('.third-button')
const slides = Array.from(slider.querySelectorAll('img'));
const slideCount = slides.length;
let slideIndex = 0;

prevButton.addEventListener('click', () => {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  slide();
});

nextButton.addEventListener('click', () => {
  slideIndex = (slideIndex + 1) % slideCount;
  slide();
});

firstButton.addEventListener('click', () => {
  slideIndex = 0;
  slide();
});

secondButton.addEventListener('click', () => {
  slideIndex = 1;
  slide();
});

thirdButton.addEventListener('click', () => {
  slideIndex = 2;
  slide();
});

const slide = () => {
  const imageWidth = slider.clientWidth;
  const slideOffset = -slideIndex * imageWidth;
  slider.style.transform = `translateX(${slideOffset}px)`;
}

window.addEventListener('load', () => {
  slide();
});