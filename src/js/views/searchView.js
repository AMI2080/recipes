import View from './view';
import icons from 'url:../../img/icons.svg';

class SearchView extends View {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  };

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._resultsContainer.insertAdjacentHTML('afterbegin', markup);
  };

  _clearInput() {
    this._parentElement.querySelector('.search__field').innerHTML = '';
  };

  addHandlerRender(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  };

  _clear() {
    this._resultsContainer.innerHTML = '';
  };
};

export default new SearchView();