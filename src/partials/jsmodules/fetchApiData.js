import axios from 'axios';
import Notiflix from 'notiflix';
import { renderImgs } from './renderCards';

const refs = {
  formEl: document.querySelector('#search-form'),
  cardContainer: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
  searchBtn: document.querySelector('button[type="submit"]'),
};

export async function getPictures(URL) {
  try {
    const response = await axios(URL);
    const cards = response.data;
    refs.cardContainer.insertAdjacentHTML('beforeend', renderImgs(cards));
    currentPage += 1;
    refs.loadBtn.classList.remove('is-hidden');
    lightbox.refresh();
    console.log(cards);

    if (cards.total === 0) {
      console.log(cards.total);
      refs.loadBtn.classList.add('is-hidden');
      Notiflix.Notify.failure(
        '"Sorry, there are no images matching your search query. Please try again."'
      );
    }

    if (cards.totalHits <= currentPage * 40) {
      refs.loadBtn.classList.add('is-hidden');
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      Notiflix.Notify.success(`Hooray! We found ${cards.totalHits} images.`);
    }
  } catch {
    refs.loadBtn.classList.add('is-hidden');
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

// export default class PixabayApiServise{
//     constructor() {
//         this.searchQuery = '';
//         this.page = 1;
//     }

//     fetchImages() {
//         console.log(this);
//         const KEY = '34703273-719fc97d4df3919ec9a1e2b2b';
//         const BASE_URL = 'https://pixabay.com';
//         const URL = `${BASE_URL}/api/?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

//         fetch(URL).then(response => response.json()).then(data => {this.page +=1});
//     }

//     get query() {
//         return this.searchQuery;
//     }

//     set query(newQuery) {
//         this.searchQuery = newQuery;
//     }
// }

// import PixabayApiServise from './partials/jsmodules/fetchApiData';

// const refs = {
//   searchForm: document.querySelector('#search-form'),
//   galleryContainer: document.querySelector('.gallery'),
//   loadMoreBtn: document.querySelector('.load-more'),
//   searchBtn: document.querySelector('button[type="submit"]'),
// };

// const PixabayApiServise = new PixabayApiServise();
// console.log(PixabayApiServise);

// refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);

// function onSearch(e) {
//   e.preventDefault();

//   PixabayApiServise.query = e.currentTarget.elements.query.value.trim();
//   PixabayApiServise.fetchImages();
// }
// function onLoadMore() {
//   PixabayApiServise.fetchImages();
// }
