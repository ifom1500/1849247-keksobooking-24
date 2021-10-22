import {setFormEnabled} from './utils.js';

const AD_FORM_DISABLED = 'map__filters--disabled';
const mapFilterForm = document.querySelector('.map__filters');
const mapCanvas = document.querySelector('#map-canvas');

const setMapFormEnabled = (enabled) => setFormEnabled(mapFilterForm, enabled, AD_FORM_DISABLED);

const renderCard = (child) => mapCanvas.append(child);

export {setMapFormEnabled, renderCard};
