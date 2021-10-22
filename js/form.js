import {setFormEnabled} from './utils.js';
import {onTitleInputChange, onRoomSelectChange, onPriceInputChange} from './validation.js';

const AD_FORM_DISABLED = 'ad-form--disabled';
const adForm = document.querySelector('.ad-form');
const titleInput = adForm.querySelector('#title');
const roomSelect = adForm.querySelector('#room_number');
const priceInput = adForm.querySelector('#price');

const setAdFormEnabled = (enabled) => setFormEnabled(adForm, enabled, AD_FORM_DISABLED);

titleInput.addEventListener('input', onTitleInputChange);
roomSelect.addEventListener('change', onRoomSelectChange);
priceInput.addEventListener('input', onPriceInputChange);

export {setAdFormEnabled};
