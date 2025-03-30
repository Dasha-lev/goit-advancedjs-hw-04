import { fetchImages, resetPage, nextPage } from './js/pixabay-api.js';
import { renderImages, clearGallery, handleError } from './js/render-functions.js';

const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const gallery = document.getElementById('gallery');

const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = 'Load more';
loadMoreBtn.className = 'load-more-btn';
loadMoreBtn.style.display = 'none';
gallery.after(loadMoreBtn);

let searchQuery = '';
let totalImages = 0;
let shownImages = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = input.value.trim();
  if (!query) return;

  searchQuery = query;
  resetPage();
  clearGallery();
  loadMoreBtn.style.display = 'none';

  try {
    const data = await fetchImages(searchQuery);
    totalImages = data.totalHits;
    shownImages = data.hits.length;

    renderImages(data);

    if (shownImages < totalImages) {
      loadMoreBtn.style.display = 'block';
    } else {
      handleError("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log(error);
  }

  input.value = '';
  input.blur();
});

loadMoreBtn.addEventListener('click', async () => {
  nextPage();

  try {
    const data = await fetchImages(searchQuery);
    shownImages += data.hits.length;
    renderImages(data);

    scrollSmoothly();

    if (shownImages >= totalImages) {
      loadMoreBtn.style.display = 'none';
      handleError("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log(error);
  }
});

function scrollSmoothly() {
  const card = document.querySelector('.gallery-item');
  if (card) {
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
