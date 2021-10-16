const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const WORKING_HOURS = ['12:00', '13:00', '14:00'];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const SIMILAR_AD_COUNT = 10;

const getRandomPositiveFloat = (a, b, precision) => {
  const min = Math.min(Math.abs(a), Math.abs(b));
  const max = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (max - min) + min;
  return +result.toFixed(precision);
};

const getRandomPositiveInteger = (a, b) => {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
};

const createCounter = () => {
  let i = 1;
  return () => i++;
};

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
  newArray.length = getRandomPositiveInteger(0, maxQuantity);

  for (let i = 0; i < newArray.length; i++) {
    newArray[i] = array[getRandomPositiveInteger(0, array.length - 1)];
  }
  return newArray;
};

const createApartmentAdData = () => {
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
      type: getRandomArrayElement(TYPES),
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

const createSimilarAdsData = () => Array.from({ length: SIMILAR_AD_COUNT }, createApartmentAdData);

export { createSimilarAdsData };
