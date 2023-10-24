// Вы создаете веб-страницу для отображения списка статей. Каждая статья состоит из заголовка и текста. Вам необходимо использовать Bootstrap для стилизации элементов.
//     Используйте Bootstrap, чтобы стилизовать элементы:
//     Заголовок статьи (<h2>)
//   Текст статьи (<p>)
//     Кнопки "Добавить статью", "Удалить" и "Редактировать".
//     Создайте начальный список статей, который будет загружаться при загрузке страницы. Используйте JSON-данные для определения заголовков и текстов статей.
//     Позвольте пользователю добавлять новые статьи. При нажатии на кнопку "Добавить статью" должна появиться новая статья с заголовком "Новая статья" и текстом "Введите содержание статьи...".
//     * Реализуйте функциональность удаления статей. При нажатии на кнопку "Удалить" соответствующая статья должна быть удалена из списка.
//     * Реализуйте функциональность редактирования статей. При нажатии на кнопку "Редактировать" пользователь должен иметь возможность изменить заголовок и текст статьи. Используйте всплывающее окно или prompt для ввода новых данных.
//     * Все изменения (добавление, удаление, редактирование) должны быть сохранены в локальное хранилище браузера, чтобы они сохранялись после перезагрузки страницы.

const STORAGE_KEY = "articles";

const getFromStorage = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

const setToStorage = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};


const articlesData = getFromStorage() ?? [
  {
    title: "Заголовок статьи 1",
    content: "Содержание статьи 1"
  },
  {
    title: "Заголовок статьи 2",
    content: "Содержание статьи 2"
  }
];

const root = document.querySelector("#root");

const editForm = document.querySelector("#editForm");

const makeArticleLayout = (article, idx) => {
  return `<div class="article" id="key-${idx}">
<h2>${article.title}</h2>
<p>${article.content}</p>
<div>
<button class="edit" type="button">Edit</button><button class="delete" type="button">Delete</button>
</div>
</div>`;
};

const addArticles = () => {
  root.innerHTML = articlesData.map((article, idx) => makeArticleLayout(article, idx)).join("");
};

const enableForm = () => {
  editForm["title"].disabled = false;
  editForm["content"].disabled = false;
};

const disableForm = () => {
  editForm["title"].disabled = true;
  editForm["content"].disabled = true;
};

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!editForm["articleIdx"].value) {
    return;
  }
  const idx = editForm["articleIdx"].value;

  const title = editForm["title"].value;
  const content = editForm["content"].value;
  if (idx === "add") {
    articlesData.push({
      title,
      content
    });
  } else {
    articlesData[+idx] = {
      title,
      content
    };
  }
  editForm["articleIdx"].value = "";
  editForm["title"].value = "";
  editForm["content"].value = "";

  addArticles();
  setToStorage(articlesData);
  disableForm();
});

const deleteArticleByIdx = (idx) => {
  articlesData.splice(idx, 1);
};

const editArticle = (idx) => {
  editForm["title"].value = articlesData[idx].title;
  editForm["content"].value = articlesData[idx].content;
  editForm["articleIdx"].value = idx;
};

const addArticle = () => {
  editForm["articleIdx"].value = "add";
};

disableForm();
addArticles();

document.addEventListener("click", (e) => {
  if (!(e.target instanceof HTMLButtonElement)) return;
  const articleId = +e.target.closest(".article")?.id.slice(4);
  switch (e.target.className) {
    case "delete":
      deleteArticleByIdx(articleId);
      addArticles();
      setToStorage(articlesData);
      return;
    case "edit":
      enableForm();
      editArticle(articleId);
      return;
    case "add":
      enableForm();
      addArticle();
      return;
    default:
      return;
  }
});
