import {createCard} from './card.js';
import {initMap, renderOffers} from './map.js';
import {setAdFormEnabled} from './form.js';
import {setMapFormEnabled} from './map.js';
import {getData} from './api.js';
import {debounce, renderGetDataError} from './utils.js';
import {setMapFiltersChange} from './filter.js';

const setPageEnabled = (enabled) => {
  setAdFormEnabled(enabled);
  setMapFormEnabled(enabled);
};

initMap(() => setPageEnabled(true));

const onSuccessGetData = (adverts) => {
  renderOffers(adverts, createCard);
  setMapFiltersChange(debounce(() => renderOffers(adverts, createCard), 100));
};

getData(onSuccessGetData, renderGetDataError);

