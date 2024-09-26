import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';

const form = document.querySelector('#search-form');
const loadMoreBtn = document.createElement('button');
const loader = document.querySelector('.loader');

loadMoreBtn.textContent = 'Load more';
loadMoreBtn.classList.add('load-more');
loadMoreBtn.style.display = 'none';  // Спочатку кнопка схована
document.body.append(loadMoreBtn);

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();

  if (!query) {
    alert('Please enter a search query');
    return;
  }

  page = 1;
  clearGallery();
  toggleLoader(true);
  toggleLoadMoreBtn(false);

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      alert('No images found');
    } else {
      renderImages(data.hits);
      if (totalHits > page * 15) {
        toggleLoadMoreBtn(true);
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    toggleLoader(false);
  }
}

async function onLoadMore() {
  page += 1;
  toggleLoader(true);

  try {
    const data = await fetchImages(query, page);
    renderImages(data.hits);

    const galleryItemHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;

    window.scrollBy({
      top: galleryItemHeight * 2,
      behavior: 'smooth',
    });

    if (page * 15 >= totalHits) {
      toggleLoadMoreBtn(false);
      alert("You've reached the end of search results");
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    toggleLoader(false);
  }
}

function toggleLoader(show) {
  loader.classList.toggle('hidden', !show);
}

function toggleLoadMoreBtn(show) {
  loadMoreBtn.style.display = show ? 'block' : 'none';
}