import { getRandomPositiveFloat, getRandomPositiveInteger, createCounter } from './util.js';
import { APARTMENT_TYPES, WORKING_HOURS, FEATURES, PHOTOS, SIMILAR_AD_COUNT } from './data.js';

const counter = createCounter();

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomArrayWithoutRepeats = (array) => {
  const clone = array.slice();
  const newArray = [];
  newArray.length = getRandomPositiveInteger(0, array.length);

  for (let i = 0; i < newArray.length; i++) {
    const index = getRandomPositiveInteger(0, clone.length - 1);
    const item = clone.splice(index, 1);
    newArray[i] = item.join();
  }
  return newArray;
};

const getRandomArrayWithRepeats = (array, maxQuantity) => {
  const newArray = [];
  newArray.length = getRandomPositiveInteger(1, maxQuantity);

  for (let i = 0; i < newArray.length; i++) {
    newArray[i] = array[getRandomPositiveInteger(0, array.length - 1)];
  }
  return newArray;
};

const createApartmentAd = () => {
  const lat = getRandomPositiveFloat(35.65, 35.7, 5);
  const lng = getRandomPositiveFloat(139.7, 139.8, 5);

  return {
    author: {
      avatar: `img/avatars/user${String(counter()).padStart(2, '0')}.png`,
    },
    offer: {
      title: 'There’s no place like home',
      address: `${lat}, ${lng}`,
      price: getRandomPositiveInteger(4000, 10000),
      type: getRandomArrayElement(APARTMENT_TYPES),
      rooms: getRandomPositiveInteger(1, 9),
      guests: getRandomPositiveInteger(1, 9),
      checkin: getRandomArrayElement(WORKING_HOURS),
      checkout: getRandomArrayElement(WORKING_HOURS),
      features: getRandomArrayWithoutRepeats(FEATURES),
      description: 'Hidden away on the fringe of the city is this charming three bedroom apartment',
      photos: getRandomArrayWithRepeats(PHOTOS, 5),
    },
    location: {
      lat,
      lng,
    },
  };
};

const similarAds = Array.from({ length: SIMILAR_AD_COUNT }, createApartmentAd);

const doAction = (array) => array; // Чтобы ESLint не выдавал ошибку, позже удалю

export { similarAds, doAction};
