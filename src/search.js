import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadingText = document.querySelector('.loading-text');

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51560990-264b69e56c9798190df8f6558';

const lightbox = new SimpleLightbox('.gallery a');

// Sayfa yüklendiğinde URL'deki query'yi form alanına yaz
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('query');
  if (query) {
    form.searchQuery.value = query;
    performSearch(query); // sayfa yüklenince otomatik arama yapar
  }
});

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = form.searchQuery.value.trim();
  if (!query) return;
  updateQueryParam(query); // URL'yi güncelle
  performSearch(query);
});

function updateQueryParam(query) {
  const newUrl = `${window.location.pathname}?query=${encodeURIComponent(query)}`;
  window.history.pushState({ path: newUrl }, '', newUrl);
}

async function performSearch(query) {
  gallery.innerHTML = '';
  gallery.style.display = 'none';
  loader.hidden = false;
  loadingText.hidden = false;

  try {
    const data = await fetchImages(query);

    if (data.hits.length === 0) {
      iziToast.warning({
        class: 'my-warning-toast',
        message: 'Sorry, no images match your search. Please try again!',
        position: 'topRight',
      });
      hideLoading();
      return;
    }

    renderGallery(data.hits);
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    hideLoading();
  }
}

function hideLoading() {
  loader.hidden = true;
  loadingText.hidden = true;
  gallery.style.display = 'grid';
}

function fetchImages(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return fetch(`${BASE_URL}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error('Fetch failed');
    }
    return response.json();
  });
}

function renderGallery(images) {
  const markup = images
    .map(image => `
      <li class="gallery-item">
        <div class="photo-card">
          <a class="gallery-link" href="${image.largeImageURL}">
            <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
          </a>
          <div class="info">
            <div class="info-column">
              <span class="info-label">Likes</span>
              <span class="info-value">${image.likes}</span>
            </div>
            <div class="info-column">
              <span class="info-label">Views</span>
              <span class="info-value">${image.views}</span>
            </div>
            <div class="info-column">
              <span class="info-label">Comments</span>
              <span class="info-value">${image.comments}</span>
            </div>
            <div class="info-column">
              <span class="info-label">Downloads</span>
              <span class="info-value">${image.downloads}</span>
            </div>
          </div>
        </div>
      </li>
    `)
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  const imagesOnPage = gallery.querySelectorAll('img.gallery-image');
  let loadedCount = 0;

  if (imagesOnPage.length === 0) {
    hideLoading();
    lightbox.refresh();
    return;
  }

  imagesOnPage.forEach(img => {
    if (img.complete) {
      incrementCounter();
    } else {
      img.addEventListener('load', incrementCounter);
      img.addEventListener('error', incrementCounter);
    }
  });

  function incrementCounter() {
    loadedCount++;
    if (loadedCount === imagesOnPage.length) {
      hideLoading();
      lightbox.refresh();
    }
  }
}
