import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { renderImgs } from './partials/jsmodules/renderCards';

const refs = {
  formEl: document.querySelector('#search-form'),
  cardContainer: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
  searchBtn: document.querySelector('button[type="submit"]'),
};

const myKey = '34703273-719fc97d4df3919ec9a1e2b2b';
const BASE_URL = 'https://pixabay.com';
let searchField = '';
let currentPage = 1;

refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadBtn.addEventListener('click', onloadBtnClick);

refs.loadBtn.classList.add('is-hidden');

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

function onFormSubmit(e, cards) {
  e.preventDefault();
  clearGalleryContainer();
  searchField = e.currentTarget.elements.searchQuery.value.trim();
  resetPage();
  const URL = `${BASE_URL}/api/?key=${myKey}&q=${searchField}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;

  if (searchField === '') {
    Notiflix.Notify.failure('Please type the field..');
  } else {
    getPictures(URL, cards).then(cards => {
      console.log(cards);
      if (cards.total === 0) {
        console.log(cards.total);
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

async function getPictures(URL) {
  try {
    const response = await axios(URL);
    const cards = response.data;
    refs.cardContainer.insertAdjacentHTML('beforeend', renderImgs(cards));
    currentPage += 1;
    refs.loadBtn.classList.remove('is-hidden');
    lightbox.refresh();
    console.log(cards)
    return cards;
  } catch {
    refs.loadBtn.classList.add('is-hidden');
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function onloadBtnClick() {
    const URL = `${BASE_URL}/api/?key=${myKey}&q=${searchField}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
  getPictures(URL);
}

function resetPage() {
  currentPage = 1;
}
function clearGalleryContainer() {
  refs.cardContainer.innerHTML = '';
}
