import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currentElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newElement, i) => {
      const currentElement = currentElements[i];
      if (!currentElement) {
        console.log(newElement.parentNode);
      } else {
        if (
          !newElement.isEqualNode(currentElement) &&
          newElement.firstChild.nodeValue.trim() !== ''
          // newElement.firstChild?.nodeValue.trim() !== ''
          //  &&
          // newElement.firstChild?.nodeValue.trim() !== undefined
        ) {
          // console.log(newElement.firstChild?.nodeValue?.trim() !== '', newElement, newElement.firstChild?.nodeValue.trim());
          currentElement.textContent = newElement.textContent;
        }
        if (!newElement.isEqualNode(currentElement)) {
          Array.from(newElement.attributes).forEach(attribute => {
            currentElement.setAttribute(attribute.name, attribute.value);
          });
        }
      }
    })
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    this._clear();
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
