import { generateAdverts } from './mock-data.js';
import { createCards } from './card.js';
import { renderCard } from './map.js';

const adverts = generateAdverts();

const cards = createCards(adverts);
console.log(cards);

renderCard(cards.children[5]);
