export function setBtnLoad(currentPage, totalPage, refs) {
  if (currentPage >= totalPage) {
    refs.btnLoadMore.classList.add('is-hidden');
  }
}

export function renderMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) =>
        `<div class"js-gallary">
        <a class="large-photo" href="${largeImageURL}">
         <img class="photo" src="${webformatURL}" alt="${tags}"  loading="lazy" />
      </div>
      <div class="info">
        <p class="info-item">
          <b>Likes</b> ${likes}
        </p>
        <p class="info-item">
          <b>Views</b> ${views}
        </p>
        <p class="info-item">
          <b>Comments</b> ${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b> ${downloads}
        </p>
        </a>
      </div>
    `
    )
    .join('');
}
