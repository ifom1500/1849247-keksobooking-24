const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterItems = mapFilter.children;

const changeStateAdForm = (toggle) => {
  if (toggle === 'off') {
    adForm.classList.add('ad-form--disabled');
    adFormFieldsets.forEach((fieldset) => {
      fieldset.disabled = true;
    });
  } else if (toggle === 'on') {
    adForm.classList.remove('ad-form--disabled');
    adFormFieldsets.forEach((fieldset) => {
      fieldset.disabled = false;
    });
  }
};

const changeStateMapFilter = (toggle) => {
  if (toggle === 'off') {
    mapFilter.classList.add('map__filters--disabled');
    for (const item of mapFilterItems) {
      item.disabled = true;
    }
  } else if (toggle === 'on') {
    mapFilter.classList.remove('map__filters--disabled');
    for (const item of mapFilterItems) {
      item.disabled = false;
    }
  }
};

export { changeStateAdForm, changeStateMapFilter };
