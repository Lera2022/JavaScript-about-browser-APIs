const app = document.querySelector('#app')
const fetchData = async (path) => {
  const res = await fetch(path);
  return await res.json();
}

const fetchUsers = async () => {
  const res = await fetchData(`https://jsonplaceholder.typicode.com/users`);
  return await res.map(user => ({id: user.id, name: user.name}));
}

const fetchTodos = async () => {
  const res = await fetchData('https://jsonplaceholder.typicode.com/todos');
  return await res.map(todo => ({id: todo.userId, name: todo.title}));
}

const createOptions = (categories) => {
  const opt = ['<option value="">-</option>']
  categories.forEach(category => opt.push(`<option value="${category.id}">${category.name}</option>`))
  return opt.join('');
}

const createSelect = (data) => {
  return `<select id="categories">${createOptions(data)}</select>`
}

const createBaseLayout = (data) => {
  return `${createSelect(data)}<div id="suppliesList"></div>`
}

const createTodosLayout = (productsData, category) => {
  if (!category) return productsData.map(supply => `<li>${supply.name}</li>`).join('');
  else return productsData.filter(supply => +supply.id === +category).map(supply => `<li>${supply.name}</li>`).join('');
}

const createTodosList = (productsData, category) => {
  return `<ul>${createTodosLayout(productsData, category)}</ul>`
}

const setActiveFilter = (e, todos) => {
  document.querySelector('#suppliesList').innerHTML = createTodosList(todos, e.target.value);
}

document.addEventListener('DOMContentLoaded', async () => {
  const users = await fetchUsers();
  app.innerHTML = createBaseLayout(users);
  const todos = await fetchTodos();
  document.querySelector('#suppliesList').innerHTML = createTodosList(todos);
  document.querySelector('#categories').addEventListener('change', (e) => {
    setActiveFilter(e, todos)
  })
})
