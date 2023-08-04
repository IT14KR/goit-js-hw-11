import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38630416-71dea153159697a7782c38894';

export class SearchApi {
  query = '';
  page = 1;
  pageSize = 40;
  totalPages = 0;

  async getApi() {
    const res = await axios.get(`${BASE_URL}`, {
      params: {
        key: API_KEY,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: this.pageSize,
      },
    });
    this.setTotal(res.data.totalHits);
    return res.data;
  }
  setTotal(total) {
    this.totalPages = total;
  }
  loadMore() {
    return this.page >= Math.ceil(this.totalPages / this.pageSize);
  }

  get query() {
    return this.query;
  }

  set query(newQuery) {
    this.query = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
