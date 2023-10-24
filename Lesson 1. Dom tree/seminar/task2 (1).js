const boxes = [];

const actions = document.querySelector('.actions');
const root = document.querySelector('#root');

const addBox = () => {
  const box = `<div class="box">${boxes.length + 1}</div>`
  boxes.push(box);
  root.insertAdjacentHTML('beforeend', box);
}

const removeBox = () => {
  boxes.pop();
  const removing = root.querySelector('.box:last-of-type');
  if (removing) {
    root.removeChild(removing);
  }
}

const copyLast = () => {
  if (!boxes.length) return;
  boxes.push(boxes[boxes.length - 1]);
  root.insertAdjacentHTML('beforeend', boxes[boxes.length - 1]);
}

const clearAll = () => {
  boxes.length = 0;
  root.innerHTML = '';
}

actions.addEventListener('click', (e) => {
  if (!e.target instanceof HTMLButtonElement) return;
  const btnId = e.target.id;
  switch (btnId) {
    case 'add':
      addBox();
      return;
    case 'remove':
      removeBox();
      return;
    case 'copy':
      copyLast();
      return;
    case 'clear':
      clearAll();
      return;
    default:
      return;
  }
})


