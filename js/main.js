import {createCard} from './card.js';
import {initMap, renderOffers} from './map.js';
import {setAdFormEnabled} from './form.js';
import {setMapFormEnabled} from './map.js';
import {getData} from './api.js';
import {renderGetDataError} from './utils.js';

const setPageEnabled = (enabled) => {
  setAdFormEnabled(enabled);
  setMapFormEnabled(enabled);
};

const onSuccessGetData = (adverts) => {
  initMap(() => setPageEnabled(true));
  renderOffers(adverts, createCard);
};

const onFailGetData = () => {
  renderGetDataError();
};

getData(onSuccessGetData, onFailGetData);
