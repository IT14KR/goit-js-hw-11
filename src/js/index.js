import Notiflix from 'notiflix';
import { SearchApi } from '../js/pixabay-api';
import { renderMarkup, setBtnLoad } from '../js/render-markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  formEl: document.querySelector('.search-form'),
  listGallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

const searchApi = new SearchApi();

refs.loadMoreBtn.classList.add('is-hidden');
refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', loadClickMoreBtn);

async function onFormSubmit(e) {
  e.preventDefault();
  searchApi.query = e.target.elements.searchQuery.value.trim();

  searchApi.resetPage();

  refs.listGallery.innerHTML = '';

  try {
    if (!searchApi.query) {
      Notiflix.Notify.failure('Sorry, enter a valid query. Please try again.');
      return;
    }
    const res = await searchApi.getApi();

    if (!res.totalHits) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notiflix.Notify.success(`Hooray! We found ${res.totalHits} images.`);
      refs.loadMoreBtn.classList.remove('is-hidden');
      createCard(res);

      if (searchApi.loadMore()) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    }
  } catch (error) {
    console.log(error);
    Notiflix.Report.failure(
      'Oops!',
      'Something went wrong! Try reloading the page!',
      'Ok'
    );
  }
}

function createCard({ hits }) {
  const markup = renderMarkup(hits);
  refs.listGallery.insertAdjacentHTML('beforeend', markup);
  lightBox.refresh();
}

async function loadClickMoreBtn() {
  searchApi.incrementPage();
  const res = await searchApi.getApi();
  createCard(res);

  if (searchApi.loadMore()) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
const lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
