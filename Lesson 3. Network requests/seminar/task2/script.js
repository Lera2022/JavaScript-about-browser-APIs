const BASE_QUERY = 'https://api.artic.edu/api/v1/artworks';

let paginationData = {
  current_page: 1,
  limit: 24,
  next_url: '',
  prev_url: '',
  offset: 0,
  total: 0,
  total_pages: 0,
}

const fetchData = async (endpoint, payload) => {
  if (!endpoint) {
    endpoint = BASE_QUERY;
  }
  const initialParamsObj = {
    limit: paginationData.limit,
    page: paginationData.page || 1,
    fields: 'title,image_id',
  };
  const { body, ...customConfig } = payload ?? {};
  const headers = {
    'Content-Type': 'application/json',
  };
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    initialParamsObj,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = body;
  }
  try {
    const response = await fetch(`${endpoint}`, config);

    if (!response.ok) {
      return Promise.reject('Failed to fetch');
    }
    return await response.json();
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const createLayout = (data) => {
  const images = data.map(img => `<img alt="${img.alt}" src="${`https://www.artic.edu/iiif/2/${img.src}/full/800,/0/default.jpg`}">`)
  document.querySelector('#app').insertAdjacentHTML('beforeend', images.join(''));
}

const placeImages = async () => {
  const response = await fetchData(paginationData.next_url);
  paginationData = {...response.pagination}
  const imagesData = response.data.map(el => ({alt: el.title, src: el.image_id}));
  console.log(imagesData);
  createLayout(imagesData);
}

document.addEventListener('DOMContentLoaded', async () => {
  placeImages()
})

let throttleTimer;
const throttle = (callback, time) => {
  if (throttleTimer) return;

  throttleTimer = true;

  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};


const handleInfiniteScroll = () => {
  throttle(() => {
    const endOfPage =
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

    if (endOfPage) {
      placeImages();
    }

  }, 1000);
};

window.addEventListener("scroll", handleInfiniteScroll);
