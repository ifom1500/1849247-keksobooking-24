import {generateAdverts} from './mock-data.js';
import {createCard} from './card.js';
import {initMap, renderOffers} from './map.js';
import {setAdFormEnabled} from './form.js';
import {setMapFormEnabled} from './map.js';

const setPageEnabled = (enabled) => {
  setAdFormEnabled(enabled);
  setMapFormEnabled(enabled);
};

initMap(setPageEnabled(true));
const adverts = generateAdverts();
renderOffers(adverts, createCard);


