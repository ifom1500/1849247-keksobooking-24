import {isEscapeKey} from './utils.js';

const SUCCESS = 'success';
const ERROR = 'error';

const errorButton = document.querySelector('.error__button');

const findTemplate = (id) => document.querySelector(`#${id}`)
  .content
  .querySelector(`.${id}`);

const removePopup = (evt, popup) => {
  evt.preventDefault();
  popup.remove();
};

const renderPopup = (id) => () => {
  const popup = findTemplate(id).cloneNode(true);
  document.querySelector('body').append(popup);

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey) {
      removePopup(evt, popup);
      document.removeEventListener('keydown', onPopupEscKeydown);
    }
  };

  const onWindowClick = (evt) => {
    removePopup(evt, popup);
    window.removeEventListener('click', onWindowClick);
  };

  document.addEventListener('keydown', onPopupEscKeydown);
  window.addEventListener('click', onWindowClick);

  if (errorButton) {
    const onErrorButtonClick = (evt) => {
      removePopup(evt, popup);
    };

    errorButton.addEventListener('click', onErrorButtonClick);
  }
};

const renderSuccessPopup = renderPopup(SUCCESS);
const renderErrorPopup = renderPopup(ERROR);

export {renderSuccessPopup, renderErrorPopup};
