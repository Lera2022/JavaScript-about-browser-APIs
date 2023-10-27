const form = document.querySelector('.form');
const resultBox = document.querySelector('.result')

form.addEventListener('submit', (e) => {
  e.preventDefault();
  resultBox.innerHTML = '';
  if (!form['first'].value || !form['second'].value) {
    resultBox.textContent = 'Should answer both questions';
    return;
  }
  const resultMarkup = `
      <h3>Your Answers</h3>
      <p>First question: ${form['first'].value}</p>
      <p>Second question: ${form['second'].value}</p>
    `
  resultBox.insertAdjacentHTML('beforeend', resultMarkup)
})
