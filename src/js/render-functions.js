import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let lightbox = null;

function handleError(message) {
  iziToast.show({
    message: message,
    position: 'topRight',
    timeout: 4000,
    backgroundColor: '#EF4040',
    messageColor: '#FAFAFB',
    iconUrl: './assets/icons/close-icon.svg',
    closeOnClick: true,
  });
}

function clearGallery() {
  document.getElementById('gallery').innerHTML = '';
}

function renderImages(data) {
  const gallery = document.getElementById('gallery');

  if (data.total === 0) {
    handleError('Нічого не знайдено. Спробуй інше слово.');
    return;
  }

  const fragment = document.createDocumentFragment();

  data.hits.forEach(img => {
    const card = document.createElement('li');
    card.className = 'gallery-item';

    card.innerHTML = `
      <a href="${img.largeImageURL}" class="gallery-link">
        <img src="${img.webformatURL}" alt="${img.tags}" class="gallery-image" />
      </a>
      <div class="gallery-info">
        <p><b>Likes:</b> ${img.likes}</p>
        <p><b>Views:</b> ${img.views}</p>
        <p><b>Comments:</b> ${img.comments}</p>
        <p><b>Downloads:</b> ${img.downloads}</p>
      </div>
    `;

    fragment.appendChild(card);
  });

  gallery.appendChild(fragment);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}

export { renderImages, handleError, clearGallery };
