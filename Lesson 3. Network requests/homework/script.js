const accessKey = 'PLEASE USE YOUR OWN KEY';
const apiUrl = 'https://api.unsplash.com/photos/random/?client_id=' + accessKey;
const historyKey = 'photoHistory';

const randomImage = document.getElementById('randomImage');
const photographerName = document.getElementById('photographerName');
const photographerUsername = document.getElementById('photographerUsername');
const likeButton = document.getElementById('likeButton');
const likeCount = document.getElementById('likeCount');
const prevButton = document.getElementById('prevButton');

let likes = 0;
let photoHistory = [];

async function fetchRandomImage() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const imageUrl = data.urls.regular;
        const photographer = data.user;

        photoHistory.push({
            imageUrl,
            photographerName: photographer.name,
            photographerUsername: photographer.username,
        });

        randomImage.src = imageUrl;

        photographerName.textContent = photographer.name;
        photographerUsername.textContent = photographer.username;
    } catch (error) {
        console.error('Ошибка при загрузке изображения: ', error);
    }
}

function handleLike() {
    likes++;
    likeCount.textContent = likes;
}

function showPreviousPhoto() {
    if (photoHistory.length > 1) {
        photoHistory.pop();

        const previousPhoto = photoHistory[photoHistory.length - 1];

        randomImage.src = previousPhoto.imageUrl;
        photographerName.textContent = previousPhoto.photographerName;
        photographerUsername.textContent = previousPhoto.photographerUsername;
    }
}

fetchRandomImage();

fetchRandomImage();

const storedLikes = localStorage.getItem('likes');
if (storedLikes !== null) {
    likes = parseInt(storedLikes);
    likeCount.textContent = likes;
}

likeButton.addEventListener('click', handleLike);
prevButton.addEventListener('click', showPreviousPhoto);

setInterval(fetchRandomImage, 5000);