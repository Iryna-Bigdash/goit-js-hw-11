import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

refs = {
  formEl: document.querySelector('#search-form'),
  cardContainer: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};
let searchField = '';
let currentPage = 1;

refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadBtn.addEventListener('click', onloadBtnClick);

refs.loadBtn.classList.add('is-hidden');
refs.cardContainer.insertAdjacentHTML('beforeend', renderImgs(cards));

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});



function onFormSubmit(e) {
  e.preventDefault();
  searchField = e.currentTarget.elements.searchQuery.value.trim();
    resetPage();
    
    if (searchField === '') {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } else {
        Notiflix.Notify.success('Hooray! We found totalHits images.'); 
        getPictures();
        renderImgs();
        refs.loadBtn.classList.remove('is-hidden');
    }
}

function getPictures() {
  const myKey = '34703273-719fc97d4df3919ec9a1e2b2b';
  fetch(
    `https://pixabay.com/api/?key=${myKey}&q=${searchField}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`
  )
    .then(responce => responce.json())
    .then(data => {
      currentPage += 1;
      renderImgs(data);
    })
    .catch(console.log('error'));
}

function renderImgs(cards) {
return cards.hits.map(
({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return `<div class="photo-card">
            <a class="photo-link" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width ='300px' height ='200px'/><a/>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`;
    }
  )
  .join('');
}

function onloadBtnClick() {
  getPictures();
}

function resetPage() {
  currentPage = 1;
}
