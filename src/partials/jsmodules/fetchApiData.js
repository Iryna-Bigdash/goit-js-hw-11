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

