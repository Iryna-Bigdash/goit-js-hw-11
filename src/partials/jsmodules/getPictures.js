export function getPictures() {
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
