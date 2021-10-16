import { createSimilarAdsData } from './mock-data.js';
import { createListOfSimilarAdCards } from './card.js';
import { renderAdCardOnCanvas } from './map.js';

const similarAdsData = createSimilarAdsData();

const listOfSimilarAdCards = createListOfSimilarAdCards(similarAdsData);

renderAdCardOnCanvas(listOfSimilarAdCards.children[5]);
