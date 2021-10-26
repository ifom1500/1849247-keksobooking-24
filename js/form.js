import {setFormEnabled} from './utils.js';

const AD_FORM_DISABLED = 'ad-form--disabled';
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const HUNDRED_ROOMS_VALUE = '100';
const MAX_PRICE_VALUE = 1000000;

const adForm = document.querySelector('.ad-form');
const titleInput = adForm.querySelector('#title');
const roomSelect = adForm.querySelector('#room_number');
const priceInput = adForm.querySelector('#price');
const capacitySelect = document.querySelector('#capacity');

const setAdFormEnabled = (enabled) => setFormEnabled(adForm, enabled, AD_FORM_DISABLED);

const onTitleInputChange = (evt) => {
  const input = evt.target;
  const valueLength = input.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    input.setCustomValidity(`Введите еще ${MIN_TITLE_LENGTH - valueLength} символов`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    input.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} символы`);
  } else {
    input.setCustomValidity('');
  }

  input.reportValidity();
};

const syncDisabledHiddenProp = (item, boolean) => {
  item.disabled = boolean;
  item.hidden = boolean;
};

const syncRoomCapacity = (value) => {
  const currentValue = value;
  const capacities = capacitySelect.children;
  const capacityNoGuests = capacitySelect.querySelector('option[value="0"]');

  let currentCapacity;

  for (let i = 0; i < capacities.length; i++) {
    if (capacities[i].value === currentValue) {
      currentCapacity = capacities[i];
    }

    if (currentValue === HUNDRED_ROOMS_VALUE) {
      syncDisabledHiddenProp(capacities[i], true);
      syncDisabledHiddenProp(capacityNoGuests, false);
      capacityNoGuests.selected = true;
    } else if (capacities[i].value <= currentValue) {
      syncDisabledHiddenProp(capacities[i], false);
      syncDisabledHiddenProp(capacityNoGuests, true);
      currentCapacity.selected = true;
    } else {
      syncDisabledHiddenProp(capacities[i], true);
      syncDisabledHiddenProp(capacityNoGuests, true);
    }
  }
};

const onRoomSelectChange = (evt) => {
  const currentRoomValue = evt.target.value;
  syncRoomCapacity(currentRoomValue);
};

const onPriceInputChange = (evt) => {
  const input = evt.target;

  if (input.value > MAX_PRICE_VALUE) {
    input.setCustomValidity('Превышена максимальная цена за жилье');
  } else {
    input.setCustomValidity('');
  }

  input.reportValidity();
};

titleInput.addEventListener('input', onTitleInputChange);
roomSelect.addEventListener('change', onRoomSelectChange);
priceInput.addEventListener('input', onPriceInputChange);

export {setAdFormEnabled};
