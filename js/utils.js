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
  const mapCanvas = document.querySelector('#map-canvas');
  mapCanvas.style.border = '10px solid crimson';
  mapCanvas.style.fontSize = '35px';
  mapCanvas.style.color = 'crimson';
  mapCanvas.style.textAlign = 'center';
  mapCanvas.style.paddingTop = '210px';
  mapCanvas.textContent = 'Ошибка получения данных';
};

export {setFormEnabled, isEscapeKey, renderGetDataError};
