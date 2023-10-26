const STORAGE_KEY = "trainings";

const getFromStorage = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

const setToStorage = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const trainingsData = getFromStorage() ?? [
    {
      name: "Стретчинг",
      time: "16:00 - 16:55",
      maxQuantity: 4,
      currentQuantity: 3
    },
    {
        name: "TRX",
        time: "18:00 - 18:55",
        maxQuantity: 6,
        currentQuantity: 5
    },
    {
        name: "Сайклы",
        time: "19:00 - 19:55",
        maxQuantity: 16,
        currentQuantity: 13
    },
    {
        name: "Зумба",
        time: "19:00 - 19:55",
        maxQuantity: 16,
        currentQuantity: 15
    },    {
        name: "Йогалатес",
        time: "19:00 - 19:55",
        maxQuantity: 16,
        currentQuantity: 15
    },
  ];

  const root = document.querySelector("#root");

  const makeTrainingLayout = (training, idx) => {
    return `<div  class="card" style="width: 18rem;" id="key-${idx}">
    <img src="./img/${idx+1}.jpg" class="card-img-top" alt="${training.name}">
    <div class="card-body">
    <h5 class="card-title">${training.name}</h5>
    <p class="card-text">Время проведения: ${training.time}</p>    <p class="card-text">максимальное количество участников: ${training.maxQuantity}</p>    <p class="card-text current">текущее количество записанных участников: ${training.currentQuantity}</p>
    <button data-idx="${idx}" type="button" class="btn btn-primary">Записаться</button>
        <button data-idx="${idx}" type="button" class="btn btn-danger">Отменить запись</button>
  </div>
  </div>`;
  };

  const addTrainings = () => {
    root.innerHTML = trainingsData.map((training, idx) => makeTrainingLayout(training, idx)).join("");
  };

  addTrainings();

  const shedule = document.querySelector('.container');
  let idxActive = null;

  shedule.addEventListener('click', event => {
    if (event.target.classList.contains('btn-primary')) {
      const trainingId = event.target.dataset.idx;
      if (trainingsData[trainingId].currentQuantity < trainingsData[trainingId].maxQuantity && idxActive !== trainingId) {
        trainingsData[trainingId].currentQuantity +=1 ;
        addTrainings();
        setToStorage(trainingsData);
        idxActive = trainingId;
      } else {
        event.target.setAttribute('disabled', '');
        event.target.textContent = 'уже записались';
      }
       }
    if (event.target.classList.contains('btn-danger')) {
      const trainingId = event.target.dataset.idx;
      if (trainingsData[trainingId].currentQuantity <= trainingsData[trainingId].maxQuantity && (idxActive === trainingId)) {
        trainingsData[trainingId].currentQuantity -=1 ;
        addTrainings();
        setToStorage(trainingsData);
        idxActive = null;
      } else {
          event.target.setAttribute('disabled', '');
          event.target.textContent = 'уже отменили';
      }
    }
  })

