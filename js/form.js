import {setFormEnabled} from './utils.js';
import {sendData} from './api.js';
import {resetAddressPin, closeAddressPopup} from './map.js';
import {renderErrorPopup, renderSuccessPopup} from './popup.js';
import {resetMapFilter} from './filter.js';

const AD_FORM_DISABLED = 'ad-form--disabled';
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const HUNDRED_ROOMS_VALUE = '100';
const MAX_PRICE_VALUE = 1000000;
const DEFAULT_PRICE = '1000';
const IMAGE_FILE_TYPES = ['jpg', 'jpeg', 'png'];

const MinPrices = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};

const adForm = document.querySelector('.ad-form');
const titleInput = adForm.querySelector('#title');
const roomSelect = adForm.querySelector('#room_number');
const priceInput = adForm.querySelector('#price');
const capacitySelect = adForm.querySelector('#capacity');
const typeSelect = adForm.querySelector('#type');
const timeFieldset = adForm.querySelector('.ad-form__element--time');
const addressInput = adForm.querySelector('#address');
const timeInInput = adForm.querySelector('#timein');
const timeOutInput = adForm.querySelector('#timeout');

const photoFileChooser = adForm.querySelector('.ad-form__input');
const photoContainer = adForm.querySelector('.ad-form__photo-container');
const photoPreview = adForm.querySelector('.ad-form__photo');
const avatarFileChooser = adForm.querySelector('.ad-form-header__input');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');

const setAdFormEnabled = (enabled) => setFormEnabled(adForm, enabled, AD_FORM_DISABLED);

const setAddressInputValue = (value) => addressInput.value = value;

// Валидация полей

const onTitleInputChange = (evt) => {
  const input = evt.target;
  const valueLength = input.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    input.setCustomValidity(`Введите еще ${MIN_TITLE_LENGTH - valueLength} символов`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    input.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} символов`);
  } else {
    input.setCustomValidity('');
  }

  input.reportValidity();
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
      capacities[i].disabled = true;
      capacityNoGuests.disabled = false;
      capacityNoGuests.selected = true;
    } else if (capacities[i].value <= currentValue) {
      capacities[i].disabled = false;
      capacityNoGuests.disabled = true;
      currentCapacity.selected = true;
    } else {
      capacities[i].disabled = true;
      capacityNoGuests.disabled = true;
    }
  }
};

const onRoomSelectChange = (evt) => syncRoomCapacity(evt.target.value);

const getMinPrice = (currentValue) => {
  for (const type in MinPrices) {
    if (currentValue === type.toLowerCase()) {
      return MinPrices[type];
    }
  }
};

const setMinPrice = (offerType) => {
  const minPrice = getMinPrice(offerType);
  priceInput.min = minPrice;
  priceInput.placeholder = minPrice;
};

const onTypeSelectChange = (evt) => {
  const currentTypeValue = evt.target.value;
  setMinPrice(currentTypeValue);
};

const onPriceInputChange = (evt) => {
  const minPrice = getMinPrice(typeSelect.value);
  const input = evt.target;

  if (input.value > MAX_PRICE_VALUE) {
    input.setCustomValidity('Превышена максимальная цена за жилье');
  } else if (input.value < minPrice) {
    input.setCustomValidity(`Минимальная цена за данный тип жилья - ${minPrice} руб.`);
  } else {
    input.setCustomValidity('');
  }

  input.reportValidity();
};

const onTimeFieldsetChange = (evt) => {
  const newValue = evt.target.value;
  timeInInput.value = newValue;
  timeOutInput.value = newValue;
};

titleInput.addEventListener('input', onTitleInputChange);
roomSelect.addEventListener('change', onRoomSelectChange);
priceInput.addEventListener('input', onPriceInputChange);
typeSelect.addEventListener('change', onTypeSelectChange);
timeFieldset.addEventListener('change', onTimeFieldsetChange);

// Сброс страницы до исходного состояния

const resetMap = () => {
  resetAddressPin();
  closeAddressPopup();
};

const clearPhotoContainer = () => {
  photoContainer.querySelectorAll('.ad-form__photo')
    .forEach((photoItem) => photoItem.remove());
};

const clearPictureContainers = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  clearPhotoContainer();
  photoContainer.append(photoPreview);
};

const resetDefaultInputValue = (input, defaultValue) => {
  input.placeholder = defaultValue;
  input.min = defaultValue;
};

const resetAdForm = () => {
  adForm.reset();
  resetDefaultInputValue(priceInput, DEFAULT_PRICE);
};

const setAdFormReset = (onAdFormReset) => {
  adForm.addEventListener('reset', () => {
    resetDefaultInputValue(priceInput, DEFAULT_PRICE);
    resetMap();
    resetMapFilter();
    clearPictureContainers();
    onAdFormReset();
  });
};

// Обработка публикации объявления

const setAdFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData (
      () => {
        resetAdForm();
        renderSuccessPopup();
        onSuccess();
      }, renderErrorPopup, new FormData(evt.target));
  });
};

// Обработка полей для загрузки изображений

const isEndingOnType = (fileName) =>
  IMAGE_FILE_TYPES.some((item) => fileName.endsWith(item));

avatarFileChooser.addEventListener('change', () => {
  const file = avatarFileChooser.files[0];

  if (isEndingOnType(file.name.toLowerCase())) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

photoFileChooser.addEventListener('change', () => {
  const files = photoFileChooser.files;

  clearPhotoContainer();

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (isEndingOnType(file.name.toLowerCase())) {

      const newPhotoPreview = photoPreview.cloneNode(false);
      const image = document.createElement('img');
      image.src = URL.createObjectURL(file);
      image.style.maxWidth = '100%';
      image.style.maxHeight = '100%';
      newPhotoPreview.append(image);
      fragment.append(newPhotoPreview);
    }
  }

  photoContainer.append(fragment);
});

export {setAdFormEnabled, setAddressInputValue, setAdFormSubmit, setAdFormReset, resetAdForm};
