const ERROR_SHOW_TIME = 3000;

const setFormEnabled = (form, enabled, disabledClass) => {
  if (enabled) {
    form.classList.remove(disabledClass);
    for (const item of form.children) {
      item.disabled = false;
    }
  } else {
    form.classList.add(disabledClass);
    for (const item of form.children) {
      item.disabled = true;
    }
  }
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const renderGetDataError = () => {
  const getDataErrorPopup = document.createElement('div');
  getDataErrorPopup.style.zIndex = '999';
  getDataErrorPopup.style.position = 'absolute';
  getDataErrorPopup.style.top = '200px';
  getDataErrorPopup.style.left = '50%';
  getDataErrorPopup.style.transform = 'translateX(-50%)';
  getDataErrorPopup.style.width = 'auto';
  getDataErrorPopup.style.padding = '100px 200px';
  getDataErrorPopup.style.fontSize = '20px';
  getDataErrorPopup.style.border = '5px solid red';
  getDataErrorPopup.style.backgroundColor = 'white';

  getDataErrorPopup.textContent = 'Ошибка получения данных! Перезагрузите страницу!';

  document.body.append(getDataErrorPopup);

  setTimeout(() => {
    getDataErrorPopup.remove();
  }, ERROR_SHOW_TIME);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {setFormEnabled, isEscapeKey, renderGetDataError, debounce};
