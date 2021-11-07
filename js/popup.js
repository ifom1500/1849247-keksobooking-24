import {isEscapeKey} from './utils.js';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const removePopup = (evt, popup) => {
  evt.preventDefault();
  popup.remove();
};

const renderPopup = (template) => () => {
  const popup = template.cloneNode(true);
  document.querySelector('body').append(popup);

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      removePopup(evt, popup);
      document.removeEventListener('keydown', onPopupEscKeydown);
    }
  };

  const onDocumentClick = (evt) => {
    removePopup(evt, popup);
    document.removeEventListener('click', onDocumentClick);
  };

  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onDocumentClick);
};

const renderSuccessPopup = renderPopup(successTemplate);
const renderErrorPopup = renderPopup(errorTemplate);

export {renderSuccessPopup, renderErrorPopup};
