import {generateAdverts} from './mock-data.js';
import {createCards} from './card.js';
import {renderCard} from './map.js';
import {setAdFormEnabled} from './form.js';
import {setMapFormEnabled} from './map.js';

const setPageEnabled = (enabled) => {
  setAdFormEnabled(enabled);
  setMapFormEnabled(enabled);
};

const adverts = generateAdverts();
const cards = createCards(adverts);
renderCard(cards.children[5]);

setPageEnabled(true);
