import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    let markup = '';
    if (this._data.currentPage > 1) {
      markup += `
      <button data-goto="${this._data.currentPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.currentPage - 1}</span>
      </button>`;
    }
    if (this._data.currentPage * this._data.resultsPerPage < this._data.results.length) {
      markup += `
      <button data-goto="${this._data.currentPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${this._data.currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
    return markup;
  }

  addHandlerRender(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      handler(btn.dataset.goto);
    })
  }
}

export default new PaginationView(); 