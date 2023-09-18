import View from "./view";
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No result is found.';

  _generateMarkup() {
    return this
      ._data
      .map(this._generatePreviewMarkup)
      .join('');
  }

  _generatePreviewMarkup(result) {
    const id = window.location.hash.slice(1);
    return `
      <li class="preview">
        <a class="preview__link ${result.id == id ? 'preview__link--active' : ''}" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <!--
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
            -->
          </div>
        </a>
      </li>`;
  }

  addClickResultsHandler() {
    window.addEventListener('hashchange', function (e) {
      document.querySelectorAll('.preview__link').forEach((link) => {
        link.classList.remove('preview__link--active')
      });
      document.querySelector(`.preview__link[href="${window.location.hash}"]`).classList.add('preview__link--active');
    });
  }
}

export default new ResultsView();