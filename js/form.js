import {setFormEnabled} from './utils.js';

const AD_FORM_DISABLED = 'ad-form--disabled';
const adForm = document.querySelector('.ad-form');

const setAdFormEnabled = (enabled) => setFormEnabled(adForm, enabled, AD_FORM_DISABLED);

export {setAdFormEnabled};
