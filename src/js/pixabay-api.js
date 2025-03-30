import axios from 'axios';
import { handleError } from './render-functions';

const API_KEY = '49574533-99195dbfc8ece3e2fce047715';
const BASE_URL = 'https://pixabay.com/api/';

const PARAMS = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
};

let page = 1;
const perPage = 15;

function resetPage() {
  page = 1;
}

function nextPage() {
  page += 1;
}

async function fetchImages(query) {
  const loader = document.getElementById('loader');
  loader.style.display = 'flex';

  try {
    const response = await axios.get(BASE_URL, {
      params: { ...PARAMS, q: query, page, per_page: perPage },
    });
    return response.data;
  } catch (error) {
    handleError('Щось пішло не так 😢');
    throw error;
  } finally {
    loader.style.display = 'none';
  }
}

export { fetchImages, resetPage, nextPage };
