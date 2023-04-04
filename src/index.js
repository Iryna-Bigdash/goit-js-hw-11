import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { renderImgs } from './partials/jsmodules/renderCards';

refs = {
  formEl: document.querySelector('#search-form'),
  cardContainer: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
  searchBtn: document.querySelector('button[type="submit"]'),
};
let searchField = '';
let currentPage = 1;

refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadBtn.addEventListener('click', onloadBtnClick);

refs.loadBtn.classList.add('is-hidden');

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

function onFormSubmit(e) {
  e.preventDefault();
  clearGalleryContainer();
  searchField = e.currentTarget.elements.searchQuery.value.trim();
  resetPage();

  if (searchField === '') {
    return Notiflix.Notify.failure('Please type the field..');
  } else {
    getPictures().then(cards => {
      if (cards.total === 0) {
        refs.loadBtn.classList.add('is-hidden');
        Notiflix.Notify.failure(
          '"Sorry, there are no images matching your search query. Please try again."'
        );
      } else {
        Notiflix.Notify.success(`Hooray! We found ${cards.totalHits} images.`);
      }
    });
  }
}

async function getPictures() {
  const myKey = '34703273-719fc97d4df3919ec9a1e2b2b';
  const BASE_URL = 'https://pixabay.com';
  const URL = `${BASE_URL}/api/?key=${myKey}&q=${searchField}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;

  try {
    const responce = await axios(URL);
    const cards = responce.data;
    refs.cardContainer.insertAdjacentHTML('beforeend', renderImgs(cards));
    currentPage += 1;
    refs.loadBtn.classList.remove('is-hidden');
    lightbox.refresh();
    return cards;
  } catch {
    refs.loadBtn.classList.add('is-hidden');
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function onloadBtnClick() {
  getPictures();
}

function resetPage() {
  currentPage = 1;
}
function clearGalleryContainer() {
  refs.cardContainer.innerHTML = '';
}
