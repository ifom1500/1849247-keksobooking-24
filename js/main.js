import {createCard} from './card.js';
import {initMap, renderOffers} from './map.js';
import {setAdFormEnabled, setAdFormListener} from './form.js';
import {setMapFormEnabled} from './map.js';
import {getData} from './api.js';
import {debounce, renderGetDataError} from './utils.js';
import {setMapFiltersChange} from './filter.js';

const setPageEnabled = (enabled) => {
  setAdFormEnabled(enabled);
  setMapFormEnabled(enabled);
};

setPageEnabled(false);

const onSuccessGetData = (adverts) => {
  setPageEnabled(true);
  renderOffers(adverts, createCard);
  setMapFiltersChange(debounce(() => renderOffers(adverts, createCard)));
  setAdFormListener(() => renderOffers(adverts, createCard));
};

initMap(() => {
  getData(onSuccessGetData, renderGetDataError);
});

