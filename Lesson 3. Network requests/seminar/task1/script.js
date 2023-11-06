const productsData = [
  {
    id: 1,
    name: "Ноутбук",
    category: "Электроника",
  },
  {
    id: 2,
    name: "Смартфон",
    category: "Электроника",
  },
  {
    id: 3,
    name: "Кофемашина",
    category: "Бытовая техника",
  },
  {
    id: 4,
    name: "Фотокамера",
    category: "Электроника",
  },
  {
    id: 5,
    name: "Микроволновая печь",
    category: "Бытовая техника",
  },
  {
    id: 6,
    name: "Книга",
    category: "Книги",
  },
  {
    id: 7,
    name: "Футболка",
    category: "Одежда",
  },
  {
    id: 8,
    name: "Шапка",
    category: "Одежда",
  },
  {
    id: 9,
    name: "Стул",
    category: "Мебель",
  },
  {
    id: 10,
    name: "Стол",
    category: "Мебель",
  },
];

const categories = productsData.reduce((a, x) => a.add(x.category), new Set());

const app = document.querySelector('#app');

const createOptions = () => {
  const opt = ['<option value="">-</option>']
  categories.forEach(category => opt.push(`<option value="${category}">${category}</option>`))
  return opt.join('');
}

const createSelect = () => {
  return `<select id="categories">${createOptions()}</select>`
}

const createBaseLayout = () => {
  return `${createSelect()}<div id="suppliesList"></div>`
}

const createSuppliesLayout = (category) => {
  if (!category) return productsData.map(supply => `<li>${supply.name}</li>`).join('');
  else return productsData.filter(supply => supply.category === category).map(supply => `<li>${supply.name}</li>`).join('');
}

const createSuppliesList = (category) => {
  return `<ul>${createSuppliesLayout(category)}</ul>`
}

const setActiveFilter = (e) => {
  document.querySelector('#suppliesList').innerHTML = createSuppliesList(e.target.value);
}

document.addEventListener('DOMContentLoaded', () => {
  app.insertAdjacentHTML('beforeend', createBaseLayout())
  document.querySelector('#suppliesList').innerHTML = createSuppliesLayout();
  document.querySelector('#categories').addEventListener('change', setActiveFilter)
})
