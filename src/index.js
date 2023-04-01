refs = {
  formEl: document.querySelector('#search-form'),
  cardContainer: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};
let searchField = '';
let currentPage = 1;

refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadBtn.addEventListener('click', onloadBtnClick);

function onFormSubmit(e) {
  e.preventDefault();
    searchField = e.currentTarget.elements.searchQuery.value.trim();
    resetPage();

  getPictures(searchField, currentPage);
}

function getPictures() {
  const myKey = '34703273-719fc97d4df3919ec9a1e2b2b';
  fetch(
    `https://pixabay.com/api/?key=${myKey}&q=${searchField}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`
  )
    .then(responce => responce.json())
    .then(data => {
      currentPage += 1;
    });
  // .catch(console.log(error));
}

function onloadBtnClick() {
   getPictures();  
}

function resetPage() {
    currentPage = 1;
}
