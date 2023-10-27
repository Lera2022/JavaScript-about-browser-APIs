const btn = document.querySelector('.btn');

const states = {
  initial: 'Buy',
  added: 'Added to Cart'
}

const DELAY = 2000;

btn.addEventListener('click', (e) => {
  console.log('clicked')
  if (!e.isTrusted || e.target.disabled) return;

  btn.textContent = states.added;
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = states.initial;
    btn.disabled = false;
  }, DELAY)
})

const fake = document.querySelector('.fake');

fake.addEventListener('click', () => {
  btn.dispatchEvent(new Event('click'));
})
