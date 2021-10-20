import { generateAdverts } from './mock-data.js';
import { createCards } from './card.js';
import { renderCard } from './map.js';
import {changeStateAdForm, changeStateMapFilter} from './form.js';

changeStateAdForm('on');
changeStateMapFilter('off');

const adverts = generateAdverts();
const cards = createCards(adverts);
renderCard(cards.children[5]);
