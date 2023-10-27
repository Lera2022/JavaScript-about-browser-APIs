const menu = document.querySelector('.nav');

menu.addEventListener('click', (e) => {
  if (!e.target.classList.contains('nav__link')) return;
  e.preventDefault();
  document.querySelectorAll('.nav__link').forEach(el => el.classList.remove('active'));
  e.target.classList.add('active');
})
